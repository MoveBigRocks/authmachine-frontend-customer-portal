export interface ChangePasswordProps {
    status: boolean,
    setPageTitle: (pageTitle: string) => void,
    changePassword: (oldPass: string, newPass: string) => void,
}