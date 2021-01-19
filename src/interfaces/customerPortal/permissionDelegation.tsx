export interface PermissionDelegationProps {
    permissions: any[],
    getPermissions: () => void,
    setPageTitle: (pageTitle: string) => void,
}