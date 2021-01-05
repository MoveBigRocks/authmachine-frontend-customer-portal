export interface PermissionInterface {
    id: string,
    object: {
        id: string,
        code: string,
        name: string
    },
    type: {
        id: string,
        code: string,
        name: string
    }
}

export interface PermissionsProps {
    objects: any[],
    permissionTypes: any[],
    permissions: any[],

    getPermissionTypes: () => void,
    getObjects: () => void,
}

export interface PermissionsState {
    permissions: any[],
}
