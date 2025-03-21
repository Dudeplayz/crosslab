from typing import List, Literal, TypedDict, Union

from typing_extensions import TypeAlias, NotRequired


class LoginRequest(TypedDict):
    """
    Properties:
    - username: Username of the user.
    - password: Password of the user.
    - method: Authentication method.
    """
    username: str
    password: str
    method: NotRequired[Literal["tui", "local"]]


LoginResponse201: TypeAlias = str


LoginResponse: TypeAlias = LoginResponse201


class LogoutRequest(TypedDict):
    """
    Properties:
    - token: The token to be invalidated.
    """
    token: NotRequired[str]


LogoutResponse: TypeAlias = None


CreateDeviceAuthenticationTokenResponse201: TypeAlias = str


CreateDeviceAuthenticationTokenResponse: TypeAlias = CreateDeviceAuthenticationTokenResponse201


class ListUsersResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


ListUsersResponse200: TypeAlias = List[ListUsersResponse200Items]


ListUsersResponse: TypeAlias = ListUsersResponse200


class CreateUserRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


class CreateUserResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


CreateUserResponse: TypeAlias = CreateUserResponse201


class GetUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


GetUserResponse: TypeAlias = GetUserResponse200


class UpdateUserRequest(TypedDict):
    """
    Properties:
    - username
    - password
    """
    username: NotRequired[str]
    password: NotRequired[str]


class UpdateUserResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


UpdateUserResponse: TypeAlias = UpdateUserResponse200


DeleteUserResponse: TypeAlias = None


class GetRolesOfUserResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


GetRolesOfUserResponse200: TypeAlias = List[GetRolesOfUserResponse200Items]


GetRolesOfUserResponse: TypeAlias = GetRolesOfUserResponse200


AddRolesToUserRequest: TypeAlias = List[str]


AddRolesToUserResponse: TypeAlias = None


RemoveRolesFromUserRequest: TypeAlias = List[str]


RemoveRolesFromUserResponse: TypeAlias = None


class ListRolesResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


ListRolesResponse200: TypeAlias = List[ListRolesResponse200Items]


ListRolesResponse: TypeAlias = ListRolesResponse200


class CreateRoleRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


class CreateRoleResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


CreateRoleResponse: TypeAlias = CreateRoleResponse201


class GetRoleResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


GetRoleResponse: TypeAlias = GetRoleResponse200


class UpdateRoleRequest(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


class UpdateRoleResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - name
    - scopes
    """
    url: str
    id: str
    name: str
    scopes: List[str]


UpdateRoleResponse: TypeAlias = UpdateRoleResponse200


DeleteRoleResponse: TypeAlias = None


class GetUsersWithRoleResponse200Items(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


GetUsersWithRoleResponse200: TypeAlias = List[GetUsersWithRoleResponse200Items]


GetUsersWithRoleResponse: TypeAlias = GetUsersWithRoleResponse200


AddUsersToRoleRequest: TypeAlias = List[str]


AddUsersToRoleResponse: TypeAlias = None


RemoveUsersFromRoleRequest: TypeAlias = List[str]


RemoveUsersFromRoleResponse: TypeAlias = None


class GetIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


GetIdentityResponse: TypeAlias = GetIdentityResponse200


class UpdateIdentityRequest(TypedDict):
    """
    Properties:
    - username
    - password
    """
    username: NotRequired[str]
    password: NotRequired[str]


class UpdateIdentityResponse200(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


UpdateIdentityResponse: TypeAlias = UpdateIdentityResponse200


class RegisterRequest(TypedDict):
    """
    Properties:
    - username: Username of the user.
    - password: Password of the user.
    """
    username: str
    password: str


class RegisterResponse201(TypedDict):
    """
    Properties:
    - url
    - id
    - username
    - password
    """
    url: str
    id: str
    username: str
    password: str


RegisterResponse: TypeAlias = RegisterResponse201


class ScheduleRequestExperimentDevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class ScheduleRequestExperiment(TypedDict):
    """
    An experiment describes a set of devices and how they should be connected (potentially among other metadata).Properties:
    - Devices: List of devices used in experiment.
    - Description: User provided description, for example might be a reason for the booking (e.g. maintenance) or a link to the experiment. Might be empty or missing.
    """
    Devices: List[ScheduleRequestExperimentDevicesItems]
    Description: NotRequired[str]


class ScheduleRequestTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class ScheduleRequest(TypedDict):
    """
    Properties:
    - Experiment: An experiment describes a set of devices and how they should be connected (potentially among other metadata).
    - Time: A time slot represents a slice of time used for bookings.
    - Combined: If true, show only one timetable per device instead of one for all available physical devices.
    - onlyOwn: (private) Show only devices of this institution. Give an error if a device of an other institution is requested.
    """
    Experiment: ScheduleRequestExperiment
    Time: ScheduleRequestTime
    Combined: NotRequired[bool]
    onlyOwn: NotRequired[bool]


class ScheduleResponse200ItemsBookedItems(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class ScheduleResponse200ItemsFreeItems(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class ScheduleResponse200Items(TypedDict):
    """
    Properties:
    - Device: ID of the device (or * if combined).
    - Booked: Array of booked times.
    - Free: Array of free times.
    """
    Device: str
    Booked: List[ScheduleResponse200ItemsBookedItems]
    Free: List[ScheduleResponse200ItemsFreeItems]


ScheduleResponse200: TypeAlias = List[ScheduleResponse200Items]


ScheduleResponse404: TypeAlias = str


ScheduleResponse422: TypeAlias = str


ScheduleResponse500: TypeAlias = str


ScheduleResponse: TypeAlias = Union[ScheduleResponse200, ScheduleResponse404, ScheduleResponse422, ScheduleResponse500]


class NewBookingRequestDevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class NewBookingRequestTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class NewBookingRequest(TypedDict):
    """
    Properties:
    - Devices: List of devices which should be added.
    - Time: A time slot represents a slice of time used for bookings.
    - Type: Type of booking. Currently, only one type is defined, but others might follow (e.g. priority booking). If empty, 'normal' is assumed.
    """
    Devices: List[NewBookingRequestDevicesItems]
    Time: NewBookingRequestTime
    Type: NotRequired[Literal["normal"]]


class NewBookingResponse200(TypedDict):
    """
    Properties:
    - BookingID: ID at which the booking can be managed.
    """
    BookingID: str


NewBookingResponse500: TypeAlias = str


NewBookingResponse: TypeAlias = Union[NewBookingResponse200, NewBookingResponse500]


class UpdateBookingRequestAlt1DevicesItems(TypedDict):
    """
    A device might either be a physical/virtual device or a group of device.Properties:
    - ID: Unique ID of the device. Contains the institution (by having an end point at that institution)
    """
    ID: str


class UpdateBookingRequestAlt1(TypedDict):
    """
    Use this request for adding devices.Properties:
    - Locked: Expresses whether the devices should be locked. Must match current status of booking.
    - Devices: List of devices which should be added.
    """
    Locked: NotRequired[bool]
    Devices: NotRequired[List[UpdateBookingRequestAlt1DevicesItems]]


class UpdateBookingRequestAlt2(TypedDict):
    """
    Use this request for adding callbacks.Properties:
    - Callback: Callback which should be called at changes.
    """
    Callback: NotRequired[str]


UpdateBookingRequest = Union[UpdateBookingRequestAlt1, UpdateBookingRequestAlt2]


class UpdateBookingResponse200(TypedDict):
    """
    Properties:
    - BookingID
    """
    BookingID: str


UpdateBookingResponse500: TypeAlias = str


UpdateBookingResponse: TypeAlias = Union[UpdateBookingResponse200, UpdateBookingResponse500]


DeleteBookingResponse500: TypeAlias = str


DeleteBookingResponse: TypeAlias = DeleteBookingResponse500


class GetBookingResponse200BookingTime(TypedDict):
    """
    A time slot represents a slice of time used for bookings.Properties:
    - Start: Start time of the booking.
    - End: End time of the booking.
    """
    Start: str
    End: str


class GetBookingResponse200Booking(TypedDict):
    """
    A booking in the booking system.Properties:
    - ID: Unique ID of the booking.
    - Time: A time slot represents a slice of time used for bookings.
    - Devices
    - Type: Type of booking. Currently, only one type is defined, but others might follow (e.g. priority booking). If empty, 'normal' is assumed.
    - Status: Current status of the booking. While the booking is pending, it can not be used. Will change automatically and can not be set by user. 'rejected' is set when the initial booking failed, 'cancelled' when the booking was deleted / cancelled after it was once active. The 'active-*' will be used when a device was added after the booking was locked.
    - You: If true, this booking was done by you.
    - External: Shows whether the booking was done by an external institution.
    - Message: User readable notes about the status of the booking (e.g. if devices are unknown).
    """
    ID: str
    Time: GetBookingResponse200BookingTime
    Devices: List[str]
    Type: NotRequired[Literal["normal"]]
    Status: Literal["pending", "booked", "rejected", "cancelled", "active", "active-pending", "active-rejected"]
    You: bool
    External: bool
    Message: NotRequired[str]


class GetBookingResponse200(TypedDict):
    """
    Properties:
    - Booking: A booking in the booking system.
    - Locked: Shows if the booking is in a locked status.
    """
    Booking: GetBookingResponse200Booking
    Locked: bool


GetBookingResponse500: TypeAlias = str


GetBookingResponse: TypeAlias = Union[GetBookingResponse200, GetBookingResponse500]


DestroyBookingResponse500: TypeAlias = str


DestroyBookingResponse: TypeAlias = DestroyBookingResponse500


class LockBookingResponse200Items(TypedDict):
    """
    Properties:
    - Requested
    - Selected
    """
    Requested: str
    Selected: str


LockBookingResponse200: TypeAlias = List[LockBookingResponse200Items]


LockBookingResponse500: TypeAlias = str


LockBookingResponse: TypeAlias = Union[LockBookingResponse200, LockBookingResponse500]


UnlockBookingResponse500: TypeAlias = str


UnlockBookingResponse: TypeAlias = UnlockBookingResponse500


BookingCallbackResponse500: TypeAlias = str


BookingCallbackResponse: TypeAlias = BookingCallbackResponse500


class ListDevicesResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device", "group", "edge instantiable", "cloud instantiable"]
    owner: str
    isPublic: bool


ListDevicesResponse200: TypeAlias = List[ListDevicesResponse200Items]


ListDevicesResponse: TypeAlias = ListDevicesResponse200


class CreateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    owner: str
    isPublic: bool
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt1ServicesItems]]


class CreateDeviceRequestAlt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class CreateDeviceRequestAlt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    owner: str
    isPublic: bool
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceRequestAlt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt2ServicesItems]]


class CreateDeviceRequestAlt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    owner: str
    isPublic: bool
    codeUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceRequestAlt3ServicesItems]]


class CreateDeviceRequestAlt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class CreateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    owner: str
    isPublic: bool
    devices: List[CreateDeviceRequestAlt4DevicesItems]


CreateDeviceRequest = Union[CreateDeviceRequestAlt1, CreateDeviceRequestAlt2, CreateDeviceRequestAlt3, CreateDeviceRequestAlt4]


class CreateDeviceResponse201Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    owner: str
    isPublic: bool
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt1ServicesItems]]


class CreateDeviceResponse201Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class CreateDeviceResponse201Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    owner: str
    isPublic: bool
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[CreateDeviceResponse201Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt2ServicesItems]]


class CreateDeviceResponse201Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class CreateDeviceResponse201Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    owner: str
    isPublic: bool
    codeUrl: NotRequired[str]
    services: NotRequired[List[CreateDeviceResponse201Alt3ServicesItems]]


class CreateDeviceResponse201Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class CreateDeviceResponse201Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    owner: str
    isPublic: bool
    devices: List[CreateDeviceResponse201Alt4DevicesItems]


CreateDeviceResponse201 = Union[CreateDeviceResponse201Alt1, CreateDeviceResponse201Alt2, CreateDeviceResponse201Alt3, CreateDeviceResponse201Alt4]


CreateDeviceResponse: TypeAlias = CreateDeviceResponse201


class GetDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    owner: str
    isPublic: bool
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt1ServicesItems]]


class GetDeviceResponse200Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class GetDeviceResponse200Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    owner: str
    isPublic: bool
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[GetDeviceResponse200Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt2ServicesItems]]


class GetDeviceResponse200Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class GetDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    owner: str
    isPublic: bool
    codeUrl: NotRequired[str]
    services: NotRequired[List[GetDeviceResponse200Alt3ServicesItems]]


class GetDeviceResponse200Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class GetDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    owner: str
    isPublic: bool
    devices: List[GetDeviceResponse200Alt4DevicesItems]


GetDeviceResponse200 = Union[GetDeviceResponse200Alt1, GetDeviceResponse200Alt2, GetDeviceResponse200Alt3, GetDeviceResponse200Alt4]


GetDeviceResponse: TypeAlias = GetDeviceResponse200


class UpdateDeviceRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt1(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - instantiateUrl
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    isPublic: NotRequired[bool]
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt1ServicesItems]]


class UpdateDeviceRequestAlt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt2(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - experiment
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["device"]
    isPublic: NotRequired[bool]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt2ServicesItems]]


class UpdateDeviceRequestAlt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceRequestAlt3(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - codeUrl
    - services
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    isPublic: NotRequired[bool]
    codeUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceRequestAlt3ServicesItems]]


class UpdateDeviceRequestAlt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class UpdateDeviceRequestAlt4(TypedDict):
    """
    Properties:
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - isPublic: If true, the device may be seen and used by every user.
    - devices
    """
    name: NotRequired[str]
    description: NotRequired[str]
    type: Literal["group"]
    isPublic: NotRequired[bool]
    devices: NotRequired[List[UpdateDeviceRequestAlt4DevicesItems]]


UpdateDeviceRequest = Union[UpdateDeviceRequestAlt1, UpdateDeviceRequestAlt2, UpdateDeviceRequestAlt3, UpdateDeviceRequestAlt4]


class UpdateDeviceResponse200Alt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt1(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - instantiateUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["cloud instantiable"]
    owner: str
    isPublic: bool
    instantiateUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt1ServicesItems]]


class UpdateDeviceResponse200Alt2AnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class UpdateDeviceResponse200Alt2ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt2(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    owner: str
    isPublic: bool
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[UpdateDeviceResponse200Alt2AnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt2ServicesItems]]


class UpdateDeviceResponse200Alt3ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class UpdateDeviceResponse200Alt3(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - codeUrl
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["edge instantiable"]
    owner: str
    isPublic: bool
    codeUrl: NotRequired[str]
    services: NotRequired[List[UpdateDeviceResponse200Alt3ServicesItems]]


class UpdateDeviceResponse200Alt4DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class UpdateDeviceResponse200Alt4(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - devices
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["group"]
    owner: str
    isPublic: bool
    devices: List[UpdateDeviceResponse200Alt4DevicesItems]


UpdateDeviceResponse200 = Union[UpdateDeviceResponse200Alt1, UpdateDeviceResponse200Alt2, UpdateDeviceResponse200Alt3, UpdateDeviceResponse200Alt4]


UpdateDeviceResponse: TypeAlias = UpdateDeviceResponse200


DeleteDeviceResponse: TypeAlias = None


class InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


class InstantiateDeviceResponse201InstanceServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - serviceDirection
    """
    serviceType: NotRequired[str]
    serviceId: NotRequired[str]
    serviceDirection: NotRequired[Literal["consumer", "producer", "prosumer"]]


class InstantiateDeviceResponse201Instance(TypedDict):
    """
    Properties:
    - url: URL of the device
    - name: Name of the device
    - description: Extended description of the device, features, etc.
    - type: Type of the device
    - owner
    - isPublic: If true, the device may be seen and used by every user.
    - connected: If true, the device is connected to the service and can be used.

    - announcedAvailability: A list of time slots that the maintainer of the device announced it is available

    - experiment
    - services
    """
    url: str
    name: str
    description: NotRequired[str]
    type: Literal["device"]
    owner: str
    isPublic: bool
    connected: NotRequired[bool]
    announcedAvailability: NotRequired[List[InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems]]
    experiment: NotRequired[str]
    services: NotRequired[List[InstantiateDeviceResponse201InstanceServicesItems]]


class InstantiateDeviceResponse201(TypedDict):
    """
    Properties:
    - instance
    - deviceToken
    """
    instance: InstantiateDeviceResponse201Instance
    deviceToken: str


InstantiateDeviceResponse: TypeAlias = InstantiateDeviceResponse201


class GetDeviceAvailabilityResponse200Items(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


GetDeviceAvailabilityResponse200: TypeAlias = List[GetDeviceAvailabilityResponse200Items]


GetDeviceAvailabilityResponse: TypeAlias = GetDeviceAvailabilityResponse200


DeleteDeviceAvailabilityRulesResponse: TypeAlias = None


class AddDeviceAvailabilityRulesRequestItems(TypedDict):
    """
    Properties:
    """


AddDeviceAvailabilityRulesRequest: TypeAlias = List[AddDeviceAvailabilityRulesRequestItems]


class AddDeviceAvailabilityRulesResponse200Items(TypedDict):
    """
    Properties:
    - start
    - end
    """
    start: NotRequired[str]
    end: NotRequired[str]


AddDeviceAvailabilityRulesResponse200: TypeAlias = List[AddDeviceAvailabilityRulesResponse200Items]


AddDeviceAvailabilityRulesResponse: TypeAlias = AddDeviceAvailabilityRulesResponse200


CreateWebsocketTokenResponse200: TypeAlias = str


CreateWebsocketTokenResponse: TypeAlias = CreateWebsocketTokenResponse200


class SendSignalingMessageRequestAlt1ServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class SendSignalingMessageRequestAlt1Config(TypedDict):
    """
    Properties:
    """


class SendSignalingMessageRequestAlt1(TypedDict):
    """
    Properties:
    - messageType
    - command
    - connectionType
    - connectionUrl
    - services
    - tiebreaker
    - config
    """
    messageType: Literal["command"]
    command: Literal["createPeerconnection"]
    connectionType: Literal["webrtc", "websocket", "local"]
    connectionUrl: str
    services: List[SendSignalingMessageRequestAlt1ServicesItems]
    tiebreaker: bool
    config: NotRequired[SendSignalingMessageRequestAlt1Config]


class SendSignalingMessageRequestAlt2(TypedDict):
    """
    Properties:
    - messageType
    - command
    - connectionUrl
    """
    messageType: Literal["command"]
    command: Literal["closePeerconnection"]
    connectionUrl: str


class SendSignalingMessageRequestAlt3Content(TypedDict):
    """
    Properties:
    """


class SendSignalingMessageRequestAlt3(TypedDict):
    """
    Properties:
    - messageType
    - signalingType
    - connectionUrl
    - content
    """
    messageType: Literal["signaling"]
    signalingType: Literal["offer", "answer", "candidate"]
    connectionUrl: str
    content: SendSignalingMessageRequestAlt3Content


SendSignalingMessageRequest = Union[SendSignalingMessageRequestAlt1, SendSignalingMessageRequestAlt2, SendSignalingMessageRequestAlt3]


SendSignalingMessageResponse: TypeAlias = None


class ListPeerconnectionsResponse200ItemsDevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    """
    url: str


class ListPeerconnectionsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: NotRequired[Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]]
    devices: List[ListPeerconnectionsResponse200ItemsDevicesItems]


ListPeerconnectionsResponse200: TypeAlias = List[ListPeerconnectionsResponse200Items]


ListPeerconnectionsResponse: TypeAlias = ListPeerconnectionsResponse200


class CreatePeerconnectionRequestDevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionRequestDevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionRequestDevicesItemsConfigServicesItems]]


class CreatePeerconnectionRequestDevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionRequestDevicesItemsConfig]


class CreatePeerconnectionRequest(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: NotRequired[Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]]
    devices: List[CreatePeerconnectionRequestDevicesItems]


class CreatePeerconnectionResponse201DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionResponse201DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionResponse201DevicesItemsConfigServicesItems]]


class CreatePeerconnectionResponse201DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionResponse201DevicesItemsConfig]


class CreatePeerconnectionResponse201(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: NotRequired[Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]]
    devices: List[CreatePeerconnectionResponse201DevicesItems]


class CreatePeerconnectionResponse202DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class CreatePeerconnectionResponse202DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[CreatePeerconnectionResponse202DevicesItemsConfigServicesItems]]


class CreatePeerconnectionResponse202DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[CreatePeerconnectionResponse202DevicesItemsConfig]


class CreatePeerconnectionResponse202(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: NotRequired[Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]]
    devices: List[CreatePeerconnectionResponse202DevicesItems]


CreatePeerconnectionResponse: TypeAlias = Union[CreatePeerconnectionResponse201, CreatePeerconnectionResponse202]


class GetPeerconnectionResponse200DevicesItemsConfigServicesItems(TypedDict):
    """
    Properties:
    - serviceType
    - serviceId
    - remoteServiceId
    """
    serviceType: str
    serviceId: str
    remoteServiceId: str


class GetPeerconnectionResponse200DevicesItemsConfig(TypedDict):
    """
    Properties:
    - services
    """
    services: NotRequired[List[GetPeerconnectionResponse200DevicesItemsConfigServicesItems]]


class GetPeerconnectionResponse200DevicesItems(TypedDict):
    """
    Properties:
    - url: URL of the device
    - config
    """
    url: str
    config: NotRequired[GetPeerconnectionResponse200DevicesItemsConfig]


class GetPeerconnectionResponse200(TypedDict):
    """
    Properties:
    - url: URL of the peerconnection
    - type: Type of the peerconnection
    - status: The status of the peerconnection.
    - devices
    """
    url: str
    type: Literal["local", "webrtc"]
    status: NotRequired[Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]]
    devices: List[GetPeerconnectionResponse200DevicesItems]


GetPeerconnectionResponse: TypeAlias = GetPeerconnectionResponse200


DeletePeerconnectionResponse: TypeAlias = None


class PatchPeerconnectionDeviceStatusRequest(TypedDict):
    """
    Properties:
    - status: The status of the peerconnection.
    """
    status: Literal["new", "connecting", "connected", "disconnected", "failed", "closed"]


PatchPeerconnectionDeviceStatusResponse: TypeAlias = None


ListExperimentsResponse200ItemsStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


ListExperimentsResponse200ItemsStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


ListExperimentsResponse200ItemsStatus = Union[ListExperimentsResponse200ItemsStatusAlt1, ListExperimentsResponse200ItemsStatusAlt2]


class ListExperimentsResponse200Items(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    """
    url: NotRequired[str]
    status: NotRequired[ListExperimentsResponse200ItemsStatus]


ListExperimentsResponse200: TypeAlias = List[ListExperimentsResponse200Items]


ListExperimentsResponse: TypeAlias = ListExperimentsResponse200


CreateExperimentRequestStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentRequestStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentRequestStatus = Union[CreateExperimentRequestStatusAlt1, CreateExperimentRequestStatusAlt2]


class CreateExperimentRequestBookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentRequestDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class CreateExperimentRequestServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentRequestServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentRequestServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentRequestServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentRequestServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentRequestInstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class CreateExperimentRequest(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[CreateExperimentRequestStatus]
    bookingTime: NotRequired[CreateExperimentRequestBookingtime]
    devices: NotRequired[List[CreateExperimentRequestDevicesItems]]
    roles: NotRequired[List[CreateExperimentRequestRolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentRequestServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[CreateExperimentRequestInstantiateddevicesItems]]


CreateExperimentResponse201StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentResponse201StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentResponse201Status = Union[CreateExperimentResponse201StatusAlt1, CreateExperimentResponse201StatusAlt2]


class CreateExperimentResponse201Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentResponse201DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentResponse201RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class CreateExperimentResponse201ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentResponse201ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse201ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentResponse201InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class CreateExperimentResponse201(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[CreateExperimentResponse201Status]
    bookingTime: NotRequired[CreateExperimentResponse201Bookingtime]
    devices: NotRequired[List[CreateExperimentResponse201DevicesItems]]
    roles: NotRequired[List[CreateExperimentResponse201RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentResponse201ServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[CreateExperimentResponse201InstantiateddevicesItems]]


CreateExperimentResponse202StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


CreateExperimentResponse202StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


CreateExperimentResponse202Status = Union[CreateExperimentResponse202StatusAlt1, CreateExperimentResponse202StatusAlt2]


class CreateExperimentResponse202Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class CreateExperimentResponse202DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class CreateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class CreateExperimentResponse202ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig]


class CreateExperimentResponse202ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[CreateExperimentResponse202ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems]]


class CreateExperimentResponse202InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class CreateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[CreateExperimentResponse202Status]
    bookingTime: NotRequired[CreateExperimentResponse202Bookingtime]
    devices: NotRequired[List[CreateExperimentResponse202DevicesItems]]
    roles: NotRequired[List[CreateExperimentResponse202RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[CreateExperimentResponse202ServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[CreateExperimentResponse202InstantiateddevicesItems]]


CreateExperimentResponse: TypeAlias = Union[CreateExperimentResponse201, CreateExperimentResponse202]


GetExperimentResponse200StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


GetExperimentResponse200StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


GetExperimentResponse200Status = Union[GetExperimentResponse200StatusAlt1, GetExperimentResponse200StatusAlt2]


class GetExperimentResponse200Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class GetExperimentResponse200DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class GetExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class GetExperimentResponse200ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig]


class GetExperimentResponse200ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[GetExperimentResponse200ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems]]


class GetExperimentResponse200InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class GetExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[GetExperimentResponse200Status]
    bookingTime: NotRequired[GetExperimentResponse200Bookingtime]
    devices: NotRequired[List[GetExperimentResponse200DevicesItems]]
    roles: NotRequired[List[GetExperimentResponse200RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[GetExperimentResponse200ServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[GetExperimentResponse200InstantiateddevicesItems]]


GetExperimentResponse: TypeAlias = GetExperimentResponse200


UpdateExperimentRequestStatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentRequestStatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentRequestStatus = Union[UpdateExperimentRequestStatusAlt1, UpdateExperimentRequestStatusAlt2]


class UpdateExperimentRequestBookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentRequestDevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentRequestRolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class UpdateExperimentRequestServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentRequestServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentRequestServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentRequestInstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class UpdateExperimentRequest(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[UpdateExperimentRequestStatus]
    bookingTime: NotRequired[UpdateExperimentRequestBookingtime]
    devices: NotRequired[List[UpdateExperimentRequestDevicesItems]]
    roles: NotRequired[List[UpdateExperimentRequestRolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentRequestServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[UpdateExperimentRequestInstantiateddevicesItems]]


UpdateExperimentResponse200StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentResponse200StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentResponse200Status = Union[UpdateExperimentResponse200StatusAlt1, UpdateExperimentResponse200StatusAlt2]


class UpdateExperimentResponse200Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentResponse200DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentResponse200RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentResponse200ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentResponse200InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class UpdateExperimentResponse200(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[UpdateExperimentResponse200Status]
    bookingTime: NotRequired[UpdateExperimentResponse200Bookingtime]
    devices: NotRequired[List[UpdateExperimentResponse200DevicesItems]]
    roles: NotRequired[List[UpdateExperimentResponse200RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentResponse200ServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[UpdateExperimentResponse200InstantiateddevicesItems]]


UpdateExperimentResponse202StatusAlt1: TypeAlias = Literal["created", "booked", "setup", "running", "finished"]


UpdateExperimentResponse202StatusAlt2: TypeAlias = Literal["created", "booked", "running", "finished"]


UpdateExperimentResponse202Status = Union[UpdateExperimentResponse202StatusAlt1, UpdateExperimentResponse202StatusAlt2]


class UpdateExperimentResponse202Bookingtime(TypedDict):
    """
    Properties:
    - startTime
    - endTime
    """
    startTime: NotRequired[str]
    endTime: NotRequired[str]


class UpdateExperimentResponse202DevicesItems(TypedDict):
    """
    Properties:
    - device: URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-).
    - role: The name of the device's role.
    """
    device: NotRequired[str]
    role: NotRequired[str]


class UpdateExperimentResponse202RolesItems(TypedDict):
    """
    Properties:
    - name: Name for an experiment role.
    - description
    """
    name: NotRequired[str]
    description: NotRequired[str]


class UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration(TypedDict):
    """
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig(TypedDict):
    """
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    Properties:
    """


class UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems(TypedDict):
    """
    Properties:
    - role: The name of the participant's role.
    - serviceId
    - config: Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    """
    role: NotRequired[str]
    serviceId: NotRequired[str]
    config: NotRequired[UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig]


class UpdateExperimentResponse202ServiceconfigurationsItems(TypedDict):
    """
    Properties:
    - serviceType: Type of the service
    - configuration: Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).

    - participants: List of participants for the service
    """
    serviceType: NotRequired[str]
    configuration: NotRequired[UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration]
    participants: NotRequired[List[UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems]]


class UpdateExperimentResponse202InstantiateddevicesItems(TypedDict):
    """
    Properties:
    - url
    - token
    - instanceOf
    """
    url: str
    token: str
    instanceOf: str


class UpdateExperimentResponse202(TypedDict):
    """
    Properties:
    - url: URL of the experiment
    - status
    - bookingTime
    - devices: Devices associated with the experiment
    - roles: Roles that are used in this experiment
    - connections: Connections associated with the experiment
    - serviceConfigurations: Services associated with the experiment
    - instantiatedDevices: Instantiated devices that need to be started by the user.
    """
    url: NotRequired[str]
    status: NotRequired[UpdateExperimentResponse202Status]
    bookingTime: NotRequired[UpdateExperimentResponse202Bookingtime]
    devices: NotRequired[List[UpdateExperimentResponse202DevicesItems]]
    roles: NotRequired[List[UpdateExperimentResponse202RolesItems]]
    connections: NotRequired[List[str]]
    serviceConfigurations: NotRequired[List[UpdateExperimentResponse202ServiceconfigurationsItems]]
    instantiatedDevices: NotRequired[List[UpdateExperimentResponse202InstantiateddevicesItems]]


UpdateExperimentResponse: TypeAlias = Union[UpdateExperimentResponse200, UpdateExperimentResponse202]


DeleteExperimentResponse: TypeAlias = None


class ListInstitutionsResponse200Items(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


ListInstitutionsResponse200: TypeAlias = List[ListInstitutionsResponse200Items]


ListInstitutionsResponse: TypeAlias = ListInstitutionsResponse200


class CreateInstitutionRequest(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


class CreateInstitutionResponse201(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


CreateInstitutionResponse: TypeAlias = CreateInstitutionResponse201


class GetInstitutionResponse200(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


GetInstitutionResponse: TypeAlias = GetInstitutionResponse200


class UpdateInstitutionRequest(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


class UpdateInstitutionResponse200(TypedDict):
    """
    Properties:
    - name
    - homepage
    - api
    - federatedApi
    - apiToken
    """
    name: NotRequired[str]
    homepage: NotRequired[str]
    api: NotRequired[str]
    federatedApi: NotRequired[str]
    apiToken: NotRequired[str]


UpdateInstitutionResponse: TypeAlias = UpdateInstitutionResponse200


DeleteInstitutionResponse: TypeAlias = None


class ListUpdatesResponse200Items(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


ListUpdatesResponse200: TypeAlias = List[ListUpdatesResponse200Items]


ListUpdatesResponse: TypeAlias = ListUpdatesResponse200


class CreateUpdateRequest(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


class CreateUpdateResponse201(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


CreateUpdateResponse: TypeAlias = CreateUpdateResponse201


GetUpdateResponse: TypeAlias = None


class PatchUpdateRequest(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


class PatchUpdateResponse200(TypedDict):
    """
    Information regarding an update. Contains the id of the device,
    the name of the latest version and a link to it.
    Properties:
    - device_id
    - latest_version
    - latest_version_link
    """
    device_id: str
    latest_version: str
    latest_version_link: str


PatchUpdateResponse: TypeAlias = PatchUpdateResponse200


DeleteUpdateResponse: TypeAlias = None
