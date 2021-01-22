export interface ResetPasswordProps {
    status: boolean,
    message: string,
    resetPassword: (values: { username: string }) => void,
    setPageTitle: (pageTitle: string) => void,
}