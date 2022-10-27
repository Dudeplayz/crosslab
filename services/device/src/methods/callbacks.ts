import { DeviceOverviewModel, PeerconnectionModel } from '../model'
import { formatDevice, formatPeerconnection } from './database/format'

export const changedCallbacks = new Map<string, Array<string>>()
export const closedCallbacks = new Map<string, Array<string>>()

/**
 * This function handles a "device-changed" callback.
 * @param device The device for which to handle the callback.
 */
export async function handleChangedCallback(device: DeviceOverviewModel) {
    const urls = changedCallbacks.get(device.uuid) ?? []
    for (const url in urls) {
        fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'device-changed',
                ...formatDevice(device),
            }),
        }).then((res) => {
            if (res.status == 410) {
                const changedCallbackURLs = changedCallbacks.get(device.uuid) ?? []
                changedCallbacks.set(
                    device.uuid,
                    changedCallbackURLs.filter((cb_url) => cb_url != url)
                )
            }
        })
    }
}

/**
 * This function handles a "peerconnection-closed" callback.
 * @param peerconnection The peerconnection for which to handle the callback.
 */
export async function handleClosedCallback(peerconnection: PeerconnectionModel) {
    const urls = closedCallbacks.get(peerconnection.uuid) ?? []
    for (const url in urls) {
        fetch(url, {
            method: 'post',
            body: JSON.stringify({
                callbackType: 'event',
                eventType: 'peerconnnection-closed',
                ...formatPeerconnection(peerconnection),
            }),
        }).then((res) => {
            if (res.status == 410) {
                const closedCallbackURLs = closedCallbacks.get(peerconnection.uuid) ?? []
                closedCallbacks.set(
                    peerconnection.uuid,
                    closedCallbackURLs.filter((cb_url) => cb_url != url)
                )
            }
        })
    }
}
