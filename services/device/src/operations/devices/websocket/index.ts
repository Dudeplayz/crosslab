import { concreteDeviceRepository } from '../../../database/repositories/device/concreteDevice'
import {
    isMessage,
    isAuthenticationMessage,
    AuthenticationMessage,
} from '../../../generated/types'
import { sendChangedCallback } from '../../../methods/callbacks'
import { deviceUrlFromId } from '../../../methods/urlFromId'
import { handleDeviceMessage } from './messageHandling'
import { logger } from '@crosslab/service-common'
import WebSocket from 'ws'

export const connectedDevices = new Map<string, WebSocket>()

class WebSocketConnectionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'WebSocketConnectionError'
    }
}

/**
 * This function adds the /devices/ws endpoint, including its functionality, to an express application.
 * @param app The express application to add the /devices/ws endpoint to.
 */
export function websocketHandling(app: Express.Application) {
    // TODO: close Peerconnections that have device as participant when websocket connection is closed?
    app.ws('/devices/websocket', (ws) => {
        // authenticate and start heartbeat
        ws.once('message', async (data) => {
            try {
                // device authentication and connection
                const message = JSON.parse(data.toString('utf8'))

                if (!(isMessage(message) && isAuthenticationMessage(message))) {
                    return ws.close(
                        1002,
                        'Received message is not an authentication message'
                    )
                }

                if (!message.token) {
                    return ws.close(
                        1002,
                        'Authentication message does not contain a valid websocket token'
                    )
                }

                const deviceModel = await concreteDeviceRepository.findOne({
                    where: { token: message.token },
                })
                if (!deviceModel) {
                    return ws.close(1002, 'No device found with matching websocket token')
                }

                deviceModel.connected = true
                connectedDevices.set(deviceModel.uuid, ws)
                await concreteDeviceRepository.save(deviceModel)
                await sendChangedCallback(deviceModel)
                logger.log(
                    'info',
                    `device '${deviceUrlFromId(deviceModel.uuid)}' connected`
                )

                // TODO: find out if this is really how it was intended
                ws.send(
                    JSON.stringify(<AuthenticationMessage>{
                        messageType: 'authenticate',
                        authenticated: true,
                    })
                )

                // heartbeat implementation
                let isAlive = true
                ws.on('pong', () => {
                    isAlive = true
                })
                const interval = setInterval(async function ping() {
                    try {
                        if (isAlive === false) {
                            deviceModel.connected = false
                            await concreteDeviceRepository.save(deviceModel)
                            await sendChangedCallback(deviceModel)
                            connectedDevices.delete(deviceModel.uuid)
                            clearInterval(interval)
                            return ws.terminate()
                        }
                        isAlive = false
                        ws.ping()
                    } catch (error) {
                        logger.log(
                            'error',
                            `An error occurred during the heartbeat check of device '${deviceUrlFromId(
                                deviceModel.uuid
                            )}'`,
                            { data: { error } }
                        )
                    }
                }, 30000)

                // close handler: stop heartbeat and disconnect device
                ws.on('close', async (code, reason) => {
                    clearInterval(interval)
                    connectedDevices.delete(deviceModel.uuid)

                    if (code === 1002) {
                        logger.log(
                            'error',
                            new WebSocketConnectionError(reason.toString('utf-8'))
                        )
                    }
                })

                // message handler: handle incoming messages from devices
                ws.on('message', async (rawData) => {
                    try {
                        const msg = JSON.parse(rawData.toString('utf-8'))
                        if (!isMessage(msg)) {
                            ws.close(1002, 'Malformed Message')
                            return
                        }
                        await handleDeviceMessage(deviceModel, msg)
                    } catch (error) {
                        logger.log(
                            'error',
                            `An error occurred while handling an incoming message for device ${deviceUrlFromId(
                                deviceModel.uuid
                            )}`,
                            { data: { error } }
                        )
                    }
                })
            } catch (error) {
                logger.log(
                    'error',
                    `Something went wrong during authentication or setup of a websocket connection`,
                    { data: { error } }
                )
                return ws.close(
                    1002,
                    'Something went wrong during authentication or setup'
                )
            }
        })
    })
}
