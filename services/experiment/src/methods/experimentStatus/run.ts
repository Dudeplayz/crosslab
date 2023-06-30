import { repositories } from '../../database/dataSource'
import { ExperimentModel } from '../../database/model'
import { callbackUrl, deviceChangedCallbacks } from '../../operations/callbacks'
import { InvalidStateError } from '../../types/errors'
import { apiClient, startCloudDeviceInstance } from '../api'
import { establishPeerconnections } from '../peerconnection'
import { experimentUrlFromId } from '../url'
import { bookExperiment } from './book'
import {
    MissingPropertyError,
    DeviceNotConnectedError,
    InvalidValueError,
} from '@crosslab/service-common'
import { logger } from '@crosslab/service-common'

/**
 * This function attempts to run an experiment.
 * @param experimentModel The experiment to be run.
 * @throws {InvalidStateError} Thrown when the status of the experiment is already "finished".
 */
export async function runExperiment(experimentModel: ExperimentModel) {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid)
    logger.log('info', 'Attempting to run experiment', { data: { experimentUrl } })
    // make sure experiment is not already finished
    if (experimentModel.status === 'finished') {
        throw new InvalidStateError(`Experiment status is already "finished"`, 400)
    }

    // make sure the experiment contains devices
    if (!experimentModel.devices || experimentModel.devices.length === 0) {
        throw new MissingPropertyError(`Experiment does not contain any devices`, 400)
    }

    // book experiment if status is "created"
    if (experimentModel.status === 'created') {
        await bookExperiment(experimentModel)
    }

    // TODO: make sure the experiment has a booking

    /**
     * This variable determines if the experiment needs to go into the state "setup".
     * The state "setup" is only needed if the experiment contains instantiable devices.
     */
    let needsSetup = false

    // make sure the concrete devices of the experiment are connected
    for (const device of experimentModel.devices) {
        const resolvedDevice = await apiClient.getDevice(device.url) // TODO: error handling
        if (resolvedDevice.type === 'device' && !resolvedDevice.connected) {
            throw new DeviceNotConnectedError(
                `Cannot start experiment since device ${device.url} is not connected`,
                500
            ) // NOTE: maybe there is a more fitting error code
        }

        if (
            (resolvedDevice.type === 'cloud instantiable' ||
                resolvedDevice.type === 'edge instantiable') &&
            device.additionalProperties?.deviceToken &&
            device.additionalProperties.instanceUrl
        ) {
            const resolvedInstance = await apiClient.getDevice(
                device.additionalProperties.instanceUrl
            ) // TODO: error handling
            if (resolvedInstance.type !== 'device')
                throw new InvalidValueError(
                    `Ìnstance has type '${resolvedInstance.type}' instead of expected type 'device'`,
                    500
                ) // NOTE: maybe there is a more fitting error code
            if (!resolvedInstance.connected) {
                throw new DeviceNotConnectedError(
                    `Cannot start experiment since device ${device.url} is not connected`,
                    500
                ) // NOTE: maybe there is a more fitting error code
            }
        }

        if (
            (resolvedDevice.type === 'cloud instantiable' ||
                resolvedDevice.type === 'edge instantiable') &&
            (!device.additionalProperties?.deviceToken ||
                !device.additionalProperties.instanceUrl)
        ) {
            // handle instantiable devices
            needsSetup = true
            if (!resolvedDevice.url)
                throw new MissingPropertyError('Device is missing its url', 500) // NOTE: error code?
            const { instance, deviceToken } = await apiClient.instantiateDevice(
                resolvedDevice.url,
                { changedUrl: callbackUrl }
            )
            if (!device.additionalProperties) device.additionalProperties = {}
            device.additionalProperties.instanceUrl = instance.url
            device.additionalProperties.deviceToken = deviceToken
            const callbacks = deviceChangedCallbacks.get(instance.url) ?? new Set()
            callbacks.add(experimentModel.uuid)
            deviceChangedCallbacks.set(instance.url, callbacks)

            // instantiate cloud instantiable devices
            if (resolvedDevice.type === 'cloud instantiable') {
                await startCloudDeviceInstance(
                    resolvedDevice,
                    instance.url,
                    deviceToken,
                    experimentUrl
                )
            }
        }
    }

    // TODO: lock devices

    // TODO: add callback to all devices/instances for changes

    experimentModel.status = needsSetup ? 'setup' : 'running'
    if (experimentModel.status === 'running')
        await establishPeerconnections(experimentModel)

    // save experiment
    await repositories.experiment.save(experimentModel)
    logger.log('info', 'Successfully running experiment', { data: { experimentUrl } })
}
