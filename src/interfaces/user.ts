import { GroupInterface } from "./group";
import {EventInterface} from "./events";
import { PermissionInterface } from "./permissions";
import {AddressInterface} from "./address";

export interface UserInterface {
    id: string,
    key?: string,
    active: boolean,
    activated: boolean,
    avatar: string,
    username: string,
    displayName: string | null,
    nickName: string | null,
    isSuperuser: boolean,
    emails: any[],
    x509Certificates: {value: string}[],
    groups: GroupInterface[],
    userType: string | null,
    externalId: any,
    profileUrl: string | null,
    phoneNumbers: any[],
    addresses: any[],
    permissions: PermissionInterface[],
    googleAuthenticatorTested: boolean,
}

export interface UsersListProps {
    total: number,
    page: number,
    pageSize: number,
    users: any[],
    orderBy: string,
    groups: any[],
    groupsSelected: string[],

    getUsers: (data: getUsersData) => void,
    getGroups: () => void,
    deleteMultipleUsers: (ids: string[]) => void,
    deactivateMultipleUsers: (ids: string[]) => void,
    deleteUser: (userId: string) => void,
    deactivateUser: (userId: string) => void,
    lockUser: (userId: string) => void,
}

export interface UsersListState {
    selectedRowKeys: any[],
    userModalType: string,
    usersModalType: string,
    showUserModal: boolean,
    showUsersModal: boolean,
    selectedUserId: null | string,
}

export interface UserCreateProps {

}

export interface UserCreateState {

}

export interface UserEditProps {
    match: {
        params: {
            id: string
        }
    },
    user: null | UserInterface,
    groups: any[],

    getUser: (userId: string) => void,
    setUser: (user: UserInterface) => void,
    getGroups: () => void,
}


export interface AddressProps {
    address: AddressInterface,
    deleteAddress: (address: AddressInterface) => void,
    editAddress: (address: AddressInterface) => void,
}

export interface AddressEditProps {
    visible: boolean,
    onCancel: () => void,
    address: AddressInterface,
    saveAddress: (values: AddressInterface) => void,
}

export interface UserDetailProps {
    user: UserInterface,
    match: {
        params: {
            id: string
        }
    },
    eventsExists: boolean,
    userEvents: EventInterface[],

    getUser: (id: string) => void,
    activateUser: (id: string) => void,
    getEvents: () => void,
}

export interface DelegatePermissionProps {
    visible: boolean,
    onCancel: () => void,
}

export interface RemovePermissionProps {
    visible: boolean,
    onCancel: () => void,
    removeItemId: null | string,
}

export type getUsersData = {
    page?: number,
    pageSize?: number,
    username?: string,
    orderBy?: string,
    onlyLocked?: boolean,
    onlyAdmin?: boolean,
    groupsSelected?: string[],
}
