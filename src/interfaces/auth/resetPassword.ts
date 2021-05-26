export interface ResetPasswordProps {
    status: boolean,
    resetPassword: (values: { username: string }) => void,
    setPageTitle: (pageTitle: string) => void,
}
