import {
    APIClient as AuthClient,
    SignaturesAuth as AuthSignatures,
    SignaturesIdentity as IdentitySignatures,
    SignaturesUsers as UsersSignatures,
    Types as AuthTypes,
    ValidationAuth as AuthValidation,
    ValidationIdentity as IdentityValidation,
    ValidationUsers as UsersValidation,
} from "./generated/auth"

import {
    APIClient as BookingClient,
    SignaturesBooking as BookingSignatures,
    Types as BookingTypes,
    ValidationBooking as BookingValidation
} from "./generated/booking"

import {
    APIClient as DeviceClient,
    SignaturesDevices as DeviceSignatures,
    SignaturesPeerconnections as PeerconnectionSignatures,
    Types as DeviceTypes,
    ValidationDevices as DeviceValidation,
    ValidationPeerconnections as PeerconnectionValidation
} from "./generated/device"

import {
    APIClient as ExperimentClient,
    SignaturesExperiments as ExperimentSignatures,
    Types as ExperimentTypes,
    ValidationExperiments as ExperimentValidation
} from "./generated/experiment"

import {
    APIClient as FederationClient,
    SignaturesInstitutions as InstitutionSignatures,
    SignaturesProxy as ProxySignatures,
    Types as FederationTypes,
    ValidationInstitutions as InstitutionValidation
} from "./generated/federation"

import {
    APIClient as UpdateClient,
    SignaturesUpdates as UpdateSignatures,
    Types as UpdateTypes,
    ValidationUpdates as UpdateValidation
} from "./generated/update"

export {
    FetchError,
    ResponseData,
    UserType,
    HttpMethods
} from "./generated/auth/types"

import {
    FetchError, 
    ResponseData
} from "./generated/booking/types"
import { URLSearchParams } from "url"
import { getAuthResponseType } from "./generated/auth/signatures/auth"

export {
    BookingTypes,
    DeviceTypes,
    ExperimentTypes,
    FederationTypes,
    AuthTypes,
    UpdateTypes
}

export { 
    BookingSignatures, 
    DeviceSignatures, 
    PeerconnectionSignatures, 
    ExperimentSignatures, 
    InstitutionSignatures, 
    ProxySignatures,
    AuthSignatures,
    IdentitySignatures,
    UsersSignatures,
    UpdateSignatures
}

function isValidHttpUrl(string: string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

function isValidUrl(url: string, endpoint: string): boolean {
    if (!isValidHttpUrl(url)) return false
    if (!url.endsWith(endpoint)) return false
    return true
}

export class APIClient {
    private authClient: AuthClient
    private bookingClient: BookingClient
    private deviceClient: DeviceClient
    private experimentClient: ExperimentClient
    private federationClient: FederationClient
    private updateClient: UpdateClient
    
    constructor(
        baseURL: string | {
            auth: string
            booking: string
            device: string
            experiment: string
            federation: string
            update: string
        }
    ) {
        this.authClient = new AuthClient(typeof baseURL === "string" ? baseURL : baseURL.auth)
        this.bookingClient = new BookingClient(typeof baseURL === "string" ? baseURL : baseURL.booking)
        this.deviceClient = new DeviceClient(typeof baseURL === "string" ? baseURL : baseURL.device)
        this.experimentClient = new ExperimentClient(typeof baseURL === "string" ? baseURL : baseURL.experiment)
        this.federationClient = new FederationClient(typeof baseURL === "string" ? baseURL : baseURL.federation)
        this.updateClient = new UpdateClient(typeof baseURL === "string" ? baseURL : baseURL.update)
    }

    set accessToken(accessToken: string) {
        this.authClient.accessToken = accessToken
        this.deviceClient.accessToken = accessToken
        this.experimentClient.accessToken = accessToken
        this.federationClient.accessToken = accessToken
        this.updateClient.accessToken = accessToken
    }

    set username(username: string) {
        this.authClient.username = username
    }

    set password(password: string) {
        this.authClient.password = password
    }

    // Auth Service authentication API calls

    public async login(
        username: string,
        password: string,
        url?: string
    ): Promise<AuthSignatures.getAuthResponseType> {
        const parameters: AuthSignatures.getAuthParametersType = { Authorization: Buffer.from(username + ":" + password).toString("base64") }
        if (!url || url.startsWith(this.authClient.baseURL)) {
            const response = await this.authClient.getAuth(parameters)
            this.accessToken = response.headers ? (response.headers.Authorization ? response.headers.Authorization : "") : ""
            return response
        } else {
            if (!isValidUrl(url, `/auth`)) throw new FetchError("URL is not valid for this operation")
            const response = await this.proxy("get", url, parameters, undefined, AuthValidation.validateGetAuthInput, AuthValidation.validateGetAuthOutput) as getAuthResponseType
            this.accessToken = response.headers ? (response.headers.Authorization ? response.headers.Authorization : "") : ""
            return response
        }
    }

    // Auth Service identity API calls

    public async getIdentity(url?: string): Promise<IdentitySignatures.getIdentityResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.getIdentity()
        } else {
            if (!isValidUrl(url, `/identity`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, IdentityValidation.validateGetIdentityInput, IdentityValidation.validateGetIdentityOutput)
        }
    }

	public async patchIdentity(
        body: IdentitySignatures.patchIdentityBodyType,
        url?: string
    ): Promise<IdentitySignatures.patchIdentityResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.patchIdentity(body)
        } else {
            if (!isValidUrl(url, `/identity`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("patch", url, undefined, body, IdentityValidation.validatePatchIdentityInput, IdentityValidation.validatePatchIdentityOutput)
        }
    }

    // Auth Service users API calls

    public async getUsers(url?: string): Promise<UsersSignatures.getUsersResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.getUsers()
        } else {
            if (!isValidUrl(url, `/users`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, UsersValidation.validateGetUsersInput, UsersValidation.validateGetUsersOutput)
        }
    }

	public async postUsers(
        body: UsersSignatures.postUsersBodyType,
        url?: string
    ): Promise<UsersSignatures.postUsersResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.postUsers(body)
        } else {
            if (!isValidUrl(url, `/users`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, undefined, body, UsersValidation.validatePostUsersInput, UsersValidation.validatePostUsersOutput)
        }
    }

	public async getUsersByUsername(
        parameters: UsersSignatures.getUsersByUsernameParametersType,
        url?: string
    ): Promise<UsersSignatures.getUsersByUsernameResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.getUsersByUsername(parameters)
        } else {
            if (!isValidUrl(url, `/users/${parameters.username}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, UsersValidation.validateGetUsersByUsernameInput, UsersValidation.validateGetUsersByUsernameOutput)
        }
    }

	public async deleteUsersByUsername(
        parameters: UsersSignatures.deleteUsersByUsernameParametersType,
        url?: string
    ): Promise<UsersSignatures.deleteUsersByUsernameResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.deleteUsersByUsername(parameters)
        } else {
            if (!isValidUrl(url, `/users/${parameters.username}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, UsersValidation.validateDeleteUsersByUsernameInput, UsersValidation.validateDeleteUsersByUsernameOutput)
        }
    }

	public async patchUsersByUsername(
        parameters: UsersSignatures.patchUsersByUsernameParametersType, 
        body: UsersSignatures.patchUsersByUsernameBodyType,
        url?: string
    ): Promise<UsersSignatures.patchUsersByUsernameResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.patchUsersByUsername(parameters, body)
        } else {
            if (!isValidUrl(url, `/users/${parameters.username}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("patch", url, parameters, undefined, UsersValidation.validatePatchUsersByUsernameInput, UsersValidation.validatePatchUsersByUsernameOutput)
        }
    }

	public async putUsersByUsernameRolesByRoleName(
        parameters: UsersSignatures.putUsersByUsernameRolesByRoleNameParametersType,
        url?: string
    ): Promise<UsersSignatures.putUsersByUsernameRolesByRoleNameResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.putUsersByUsernameRolesByRoleName(parameters)
        } else {
            if (!isValidUrl(url, `/users/${parameters.username}/roles/${parameters.role_name}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("put", url, parameters, undefined, UsersValidation.validatePutUsersByUsernameRolesByRoleNameInput, UsersValidation.validatePutUsersByUsernameRolesByRoleNameOutput)
        }
    }

	public async deleteUsersByUsernameRolesByRoleName(
        parameters: UsersSignatures.deleteUsersByUsernameRolesByRoleNameParametersType,
        url?: string
    ): Promise<UsersSignatures.deleteUsersByUsernameRolesByRoleNameResponseType> {
        if (!url || url.startsWith(this.authClient.baseURL)) {
            return this.authClient.deleteUsersByUsernameRolesByRoleName(parameters)
        } else {
            if (!isValidUrl(url, `/users/${parameters.username}/roles/${parameters.role_name}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, UsersValidation.validateDeleteUsersByUsernameRolesByRoleNameInput, UsersValidation.validateDeleteUsersByUsernameRolesByRoleNameOutput)
        }
    }

    // Booking Service API calls

    public async postBookingSchedule(
        body: BookingSignatures.postBookingScheduleBodyType,
        url?: string
    ): Promise<BookingSignatures.postBookingScheduleResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.postBookingSchedule(body)
        } else {
            if (!isValidUrl(url, `/booking/schedule`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, undefined, body, BookingValidation.validatePostBookingScheduleInput, BookingValidation.validatePostBookingScheduleOutput)
        }
    }

    public async putBookingManage(
        body: BookingSignatures.putBookingManageBodyType,
        url?: string
    ): Promise<BookingSignatures.putBookingManageResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingManage(body)
        } else {
            if (!isValidUrl(url, `/booking/manage`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("put", url, undefined, body, BookingValidation.validatePutBookingManageInput, BookingValidation.validatePutBookingManageOutput)
        }
    }

    public async getBookingManageByID(
        parameters: BookingSignatures.getBookingManageByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.getBookingManageByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.getBookingManageByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, BookingValidation.validateGetBookingManageByIDInput, BookingValidation.validateGetBookingManageByIDOutput)
        }
    }

    public async deleteBookingManageByID(
        parameters: BookingSignatures.deleteBookingManageByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingManageByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingManageByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingManageByIDInput, BookingValidation.validateDeleteBookingManageByIDOutput)
        }
    }

    public async patchBookingManageByID(
        parameters: BookingSignatures.patchBookingManageByIDParametersType, 
        body: BookingSignatures.patchBookingManageByIDBodyType,
        url?: string
    ): Promise<BookingSignatures.patchBookingManageByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.patchBookingManageByID(parameters, body)
        } else {
            if (!isValidUrl(url, `/booking/manage/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("patch", url, parameters, body, BookingValidation.validatePatchBookingManageByIDInput, BookingValidation.validatePatchBookingManageByIDOutput)
        }
    }

    public async deleteBookingDestroyByID(
        parameters: BookingSignatures.deleteBookingDestroyByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingDestroyByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingDestroyByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/destroy/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingDestroyByIDInput, BookingValidation.validateDeleteBookingDestroyByIDOutput)
        }
    }

    public async putBookingLockByID(
        parameters: BookingSignatures.putBookingLockByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.putBookingLockByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingLockByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/lock/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("put", url, parameters, undefined, BookingValidation.validatePutBookingLockByIDInput, BookingValidation.validatePutBookingLockByIDOutput)
        }
    }

    public async deleteBookingLockByID(
        parameters: BookingSignatures.deleteBookingLockByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingLockByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingLockByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/lock/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingLockByIDInput, BookingValidation.validateDeleteBookingLockByIDOutput)
        }
    }

    public async postBookingCallbackByID(
        parameters: BookingSignatures.postBookingCallbackByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.postBookingCallbackByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.postBookingCallbackByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/callback/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, parameters, undefined, BookingValidation.validatePostBookingCallbackByIDInput, BookingValidation.validatePostBookingCallbackByIDOutput)
        }
    }

    public async putBookingDevice(
        body: BookingSignatures.putBookingDeviceBodyType,
        url?: string
    ): Promise<BookingSignatures.putBookingDeviceResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.putBookingDevice(body)
        } else {
            if (!isValidUrl(url, `/booking/device`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("put", url, undefined, body, BookingValidation.validatePutBookingDeviceInput, BookingValidation.validatePutBookingDeviceOutput)
        }
    }

    public async getBookingDeviceByID(
        parameters: BookingSignatures.getBookingDeviceByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.getBookingDeviceByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.getBookingDeviceByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/device/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, BookingValidation.validateGetBookingDeviceByIDInput, BookingValidation.validateGetBookingDeviceByIDOutput)
        }
    }

    public async deleteBookingDeviceByID(
        parameters: BookingSignatures.deleteBookingDeviceByIDParametersType,
        url?: string
    ): Promise<BookingSignatures.deleteBookingDeviceByIDResponseType> {
        if (!url || url.startsWith(this.bookingClient.baseURL)) {
            return this.bookingClient.deleteBookingDeviceByID(parameters)
        } else {
            if (!isValidUrl(url, `/booking/device/${parameters.ID}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, BookingValidation.validateDeleteBookingDeviceByIDInput, BookingValidation.validateDeleteBookingDeviceByIDOutput)
        }
    }

    // Device Service API calls

    public async getDevices(url?: string): Promise<DeviceSignatures.getDevicesResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevices()
        } else {
            if (!isValidUrl(url, `/devices`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, DeviceValidation.validateGetDevicesInput, DeviceValidation.validateGetDevicesOutput)
        }
    }

	public async postDevices(
        parameters: DeviceSignatures.postDevicesParametersType, 
        body: DeviceSignatures.postDevicesBodyType,
        url?: string
    ): Promise<DeviceSignatures.postDevicesResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postDevices(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices`)) throw new FetchError("URL is not valid for this operation")
            let finalUrl = url
            if (parameters.changedUrl) finalUrl += "?" + new URLSearchParams({ changedUrl: parameters.changedUrl })
            return this.proxy("post", finalUrl, parameters, body, DeviceValidation.validatePostDevicesInput, DeviceValidation.validatePostDevicesOutput)
        }
    }

	public async getDevicesByDeviceId(
        parameters: DeviceSignatures.getDevicesByDeviceIdParametersType,
        url?: string
    ): Promise<DeviceSignatures.getDevicesByDeviceIdResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevicesByDeviceId(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) throw new FetchError("URL is not valid for this operation")
            let finalUrl = url
            if (parameters.flat_group !== undefined) finalUrl += "?" + new URLSearchParams({ flat_group: parameters.flat_group ? "true" : "false" })
            return this.proxy("get", finalUrl, parameters, undefined, DeviceValidation.validateGetDevicesByDeviceIdInput, DeviceValidation.validateGetDevicesByDeviceIdOutput)
        }
    }

	public async deleteDevicesByDeviceId(
        parameters: DeviceSignatures.deleteDevicesByDeviceIdParametersType,
        url?: string
    ): Promise<DeviceSignatures.deleteDevicesByDeviceIdResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.deleteDevicesByDeviceId(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, DeviceValidation.validateDeleteDevicesByDeviceIdInput, DeviceValidation.validateDeleteDevicesByDeviceIdOutput)
        }
    }

	public async patchDevicesByDeviceId(
        parameters: DeviceSignatures.patchDevicesByDeviceIdParametersType, 
        body: DeviceSignatures.patchDevicesByDeviceIdBodyType,
        url?: string
    ): Promise<DeviceSignatures.patchDevicesByDeviceIdResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.patchDevicesByDeviceId(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}`)) throw new FetchError("URL is not valid for this operation")
            let finalUrl = url
            if (parameters.changedUrl) finalUrl += "?" + new URLSearchParams({ changedUrl: parameters.changedUrl })
            return this.proxy("patch", finalUrl, parameters, body, DeviceValidation.validatePatchDevicesByDeviceIdInput, DeviceValidation.validatePatchDevicesByDeviceIdOutput)
        }
    }

	public async postDevicesByDeviceIdAvailability(
        parameters: DeviceSignatures.postDevicesByDeviceIdAvailabilityParametersType, 
        body: DeviceSignatures.postDevicesByDeviceIdAvailabilityBodyType,
        url?: string
    ): Promise<DeviceSignatures.postDevicesByDeviceIdAvailabilityResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postDevicesByDeviceIdAvailability(parameters, body)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}/availability`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, parameters, body, DeviceValidation.validatePostDevicesByDeviceIdAvailabilityInput, DeviceValidation.validatePostDevicesByDeviceIdAvailabilityOutput)
        }
    }

	public async getDevicesByDeviceIdToken(
        parameters: DeviceSignatures.getDevicesByDeviceIdTokenParametersType,
        url?: string
    ): Promise<DeviceSignatures.getDevicesByDeviceIdTokenResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getDevicesByDeviceIdToken(parameters)
        } else {
            if (!isValidUrl(url, `/devices/${parameters.device_id}/token`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, DeviceValidation.validateGetDevicesByDeviceIdTokenInput, DeviceValidation.validateGetDevicesByDeviceIdTokenOutput)
        }
    }

    public async getPeerconnections(url?: string): Promise<PeerconnectionSignatures.getPeerconnectionsResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getPeerconnections()
        } else {
            if (!isValidUrl(url, `/peerconnections`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, PeerconnectionValidation.validateGetPeerconnectionsInput, PeerconnectionValidation.validateGetPeerconnectionsOutput)
        }
    }

	public async postPeerconnections(
        parameters: PeerconnectionSignatures.postPeerconnectionsParametersType, 
        body: PeerconnectionSignatures.postPeerconnectionsBodyType,
        url?: string
    ): Promise<PeerconnectionSignatures.postPeerconnectionsResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.postPeerconnections(parameters, body)
        } else {
            if (!isValidUrl(url, `/peerconnections`)) throw new FetchError("URL is not valid for this operation")
            let finalUrl = url
            if (parameters.closedUrl) finalUrl += "?" + new URLSearchParams({ closedUrl: parameters.closedUrl })
            return this.proxy("post", finalUrl, parameters, body, PeerconnectionValidation.validatePostPeerconnectionsInput, PeerconnectionValidation.validatePostPeerconnectionsOutput)
        }
    }

	public async getPeerconnectionsByPeerconnectionId(
        parameters: PeerconnectionSignatures.getPeerconnectionsByPeerconnectionIdParametersType,
        url?: string
    ): Promise<PeerconnectionSignatures.getPeerconnectionsByPeerconnectionIdResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.getPeerconnectionsByPeerconnectionId(parameters)
        } else {
            if (!isValidUrl(url, `/peerconnections/${parameters.peerconnection_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, PeerconnectionValidation.validateGetPeerconnectionsByPeerconnectionIdInput, PeerconnectionValidation.validateGetPeerconnectionsByPeerconnectionIdOutput)
        }
    }

	public async deletePeerconnectionsByPeerconnectionId(
        parameters: PeerconnectionSignatures.deletePeerconnectionsByPeerconnectionIdParametersType,
        url?: string
    ): Promise<PeerconnectionSignatures.deletePeerconnectionsByPeerconnectionIdResponseType> {
        if (!url || url.startsWith(this.deviceClient.baseURL)) {
            return this.deviceClient.deletePeerconnectionsByPeerconnectionId(parameters)
        } else {
            if (!isValidUrl(url, `/peerconnections/${parameters.peerconnection_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, PeerconnectionValidation.validateDeletePeerconnectionsByPeerconnectionIdInput, PeerconnectionValidation.validateDeletePeerconnectionsByPeerconnectionIdOutput)
        }
    }

    // Experiment Service API calls

    public async getExperiments(url?: string): Promise<ExperimentSignatures.getExperimentsResponseType> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.getExperiments()
        } else {
            if (!isValidUrl(url, `/experiments`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, ExperimentValidation.validateGetExperimentsInput, ExperimentValidation.validateGetExperimentsOutput)
        }
    }

	public async postExperiments(
        body: ExperimentSignatures.postExperimentsBodyType,
        url?: string
    ): Promise<ExperimentSignatures.postExperimentsResponseType> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.postExperiments(body)
        } else {
            if (!isValidUrl(url, `/experiments`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, undefined, body, ExperimentValidation.validatePostExperimentsInput, ExperimentValidation.validatePostExperimentsOutput)
        }
    }

	public async getExperimentsByExperimentId(
        parameters: ExperimentSignatures.getExperimentsByExperimentIdParametersType,
        url?: string
    ): Promise<ExperimentSignatures.getExperimentsByExperimentIdResponseType> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.getExperimentsByExperimentId(parameters)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, ExperimentValidation.validateGetExperimentsByExperimentIdInput, ExperimentValidation.validateGetExperimentsByExperimentIdOutput)
        }
    }

	public async deleteExperimentsByExperimentId(
        parameters: ExperimentSignatures.deleteExperimentsByExperimentIdParametersType,
        url?: string
    ): Promise<ExperimentSignatures.deleteExperimentsByExperimentIdResponseType> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.deleteExperimentsByExperimentId(parameters)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, ExperimentValidation.validateDeleteExperimentsByExperimentIdInput, ExperimentValidation.validateDeleteExperimentsByExperimentIdOutput)
        }
    }

	public async patchExperimentsByExperimentId(
        parameters: ExperimentSignatures.patchExperimentsByExperimentIdParametersType, 
        body: ExperimentSignatures.patchExperimentsByExperimentIdBodyType,
        url?: string
    ): Promise<ExperimentSignatures.patchExperimentsByExperimentIdResponseType> {
        if (!url || url.startsWith(this.experimentClient.baseURL)) {
            return this.experimentClient.patchExperimentsByExperimentId(parameters, body)
        } else {
            if (!isValidUrl(url, `/experiments/${parameters.experiment_id}`)) throw new FetchError("URL is not valid for this operation")
            let finalUrl = url
            if (parameters.changedURL) finalUrl += "?" + new URLSearchParams({ changedURL: parameters.changedURL })
            return this.proxy("patch", finalUrl, parameters, body, ExperimentValidation.validatePatchExperimentsByExperimentIdInput, ExperimentValidation.validatePatchExperimentsByExperimentIdOutput)
        }
    }

    // Federation Service API calls

    public async getInstitutions(url?: string): Promise<InstitutionSignatures.getInstitutionsResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.getInstitutions()
        } else {
            if (!isValidUrl(url, `/institutions`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, InstitutionValidation.validateGetInstitutionsInput, InstitutionValidation.validateGetInstitutionsOutput)
        }
    }

	public async postInstitutions(
        body: InstitutionSignatures.postInstitutionsBodyType,
        url?: string
    ): Promise<InstitutionSignatures.postInstitutionsResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.postInstitutions(body)
        } else {
            if (!isValidUrl(url, `/institutions`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, undefined, body, InstitutionValidation.validatePostInstitutionsInput, InstitutionValidation.validatePostInstitutionsOutput)
        }
    }

	public async getInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.getInstitutionsByInstitutionIdParametersType,
        url?: string
    ): Promise<InstitutionSignatures.getInstitutionsByInstitutionIdResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.getInstitutionsByInstitutionId(parameters)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, InstitutionValidation.validateGetInstitutionsByInstitutionIdInput, InstitutionValidation.validateGetInstitutionsByInstitutionIdOutput)
        }
    }

	public async deleteInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.deleteInstitutionsByInstitutionIdParametersType,
        url?: string
    ): Promise<InstitutionSignatures.deleteInstitutionsByInstitutionIdResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.deleteInstitutionsByInstitutionId(parameters)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, InstitutionValidation.validateDeleteInstitutionsByInstitutionIdInput, InstitutionValidation.validateDeleteInstitutionsByInstitutionIdOutput)
        }
    }

	public async patchInstitutionsByInstitutionId(
        parameters: InstitutionSignatures.patchInstitutionsByInstitutionIdParametersType, 
        body: InstitutionSignatures.patchInstitutionsByInstitutionIdBodyType,
        url?: string
    ): Promise<InstitutionSignatures.patchInstitutionsByInstitutionIdResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.federationClient.patchInstitutionsByInstitutionId(parameters, body)
        } else {
            if (!isValidUrl(url, `/institutions/${parameters.institution_id}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("patch", url, parameters, body, InstitutionValidation.validatePatchInstitutionsByInstitutionIdInput, InstitutionValidation.validatePatchInstitutionsByInstitutionIdOutput)
        }
    }

    public async headProxy(
        parameters: ProxySignatures.headProxyParametersType
    ): Promise<ProxySignatures.headProxyResponseType> {
        return this.federationClient.headProxy(parameters, undefined)
    }

	public async getProxy(
        parameters: ProxySignatures.getProxyParametersType,
        body: ProxySignatures.getProxyBodyType
    ): Promise<ProxySignatures.getProxyResponseType> {
        return this.federationClient.getProxy(parameters, body)
    }

	public async putProxy(
        parameters: ProxySignatures.putProxyParametersType,
        body: ProxySignatures.putProxyBodyType
    ): Promise<ProxySignatures.putProxyResponseType> {
        return this.federationClient.putProxy(parameters, body)
    }

	public async postProxy(
        parameters: ProxySignatures.postProxyParametersType,
        body: ProxySignatures.postProxyBodyType
    ): Promise<ProxySignatures.postProxyResponseType> {
        return this.federationClient.postProxy(parameters, body)
    }

	public async deleteProxy(
        parameters: ProxySignatures.deleteProxyParametersType,
        body: ProxySignatures.deleteProxyBodyType
    ): Promise<ProxySignatures.deleteProxyResponseType> {
        return this.federationClient.deleteProxy(parameters, body)
    }

	public async optionsProxy(
        parameters: ProxySignatures.optionsProxyParametersType
    ): Promise<ProxySignatures.optionsProxyResponseType> {
        return this.federationClient.optionsProxy(parameters, undefined)
    }

	public async traceProxy(
        parameters: ProxySignatures.traceProxyParametersType
    ): Promise<ProxySignatures.traceProxyResponseType> {
        return this.federationClient.traceProxy(parameters, undefined)
    }

	public async patchProxy(
        parameters: ProxySignatures.patchProxyParametersType,
        body: ProxySignatures.patchProxyBodyType
    ): Promise<ProxySignatures.patchProxyResponseType> {
        return this.federationClient.patchProxy(parameters, body)
    }

    private async proxy<P extends {[k: string]: unknown}|undefined,B,R extends ResponseData,IV extends (par: P, body: B) => boolean,OV extends (res: ResponseData) => res is R>(
        method: "get" | "delete" | "post" | "put" | "patch" | "trace" | "options" | "head",
        url: string,
        parameters: P,
        body: B,
        validateInput: IV,
        validateOutput: OV
    ): Promise<R> {
        if (!validateInput(parameters, body)) throw new FetchError("Input validation failed!")
        let response
        switch(method) {
            case "get":
                response = await this.federationClient.getProxy({ URL: url }, body)
                break
            case "delete":
                response = await this.federationClient.deleteProxy({ URL: url }, body)
                break
            case "head":
                response = await this.federationClient.headProxy({ URL: url }, body)
                break
            case "options":
                response = await this.federationClient.optionsProxy({ URL: url }, body)
                break
            case "patch":
                response = await this.federationClient.patchProxy({ URL: url }, body)
                break
            case "post":
                response = await this.federationClient.postProxy({ URL: url }, body)
                break
            case "put":
                response = await this.federationClient.putProxy({ URL: url }, body)
                break
            case "trace":
                response = await this.federationClient.traceProxy({ URL: url }, body)
                break
        }
        if (!validateOutput(response)) throw new FetchError("Output validation failed!")
        return response
    }

    // Update Service API calls

	public async getUpdates(url?: string): Promise<UpdateSignatures.getUpdatesResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.updateClient.getUpdates()
        } else {
            if (!isValidUrl(url, `/updates`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, undefined, undefined, UpdateValidation.validateGetUpdatesInput, UpdateValidation.validateGetUpdatesOutput)
        }
    }

	public async postUpdates(
        body: UpdateSignatures.postUpdatesBodyType,
        url?: string
    ): Promise<UpdateSignatures.postUpdatesResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.updateClient.postUpdates(body)
        } else {
            if (!isValidUrl(url, `/updates`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("post", url, undefined, body, UpdateValidation.validatePostUpdatesInput, UpdateValidation.validatePostUpdatesOutput)
        }
    }

	public async getUpdatesByMacAddress(
        parameters: UpdateSignatures.getUpdatesByMacAddressParametersType,
        url?: string
    ): Promise<UpdateSignatures.getUpdatesByMacAddressResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.updateClient.getUpdatesByMacAddress(parameters)
        } else {
            if (!isValidUrl(url, `/updates/${parameters.mac_address}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("get", url, parameters, undefined, UpdateValidation.validateGetUpdatesByMacAddressInput, UpdateValidation.validateGetUpdatesByMacAddressOutput)
        }
    }

	public async deleteUpdatesByMacAddress(
        parameters: UpdateSignatures.deleteUpdatesByMacAddressParametersType,
        url?: string
    ): Promise<UpdateSignatures.deleteUpdatesByMacAddressResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.updateClient.deleteUpdatesByMacAddress(parameters)
        } else {
            if (!isValidUrl(url, `/updates//${parameters.mac_address}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("delete", url, parameters, undefined, UpdateValidation.validateDeleteUpdatesByMacAddressInput, UpdateValidation.validateDeleteUpdatesByMacAddressOutput)
        }
    }

	public async patchUpdatesByMacAddress(
        parameters: UpdateSignatures.patchUpdatesByMacAddressParametersType, 
        body: UpdateSignatures.patchUpdatesByMacAddressBodyType,
        url?: string
    ): Promise<UpdateSignatures.patchUpdatesByMacAddressResponseType> {
        if (!url || url.startsWith(this.federationClient.baseURL)) {
            return this.updateClient.patchUpdatesByMacAddress(parameters, body)
        } else {
            if (!isValidUrl(url, `/updates/${parameters.mac_address}`)) throw new FetchError("URL is not valid for this operation")
            return this.proxy("patch", url, parameters, body, UpdateValidation.validatePatchUpdatesByMacAddressInput, UpdateValidation.validatePatchUpdatesByMacAddressOutput)
        }
    }
}