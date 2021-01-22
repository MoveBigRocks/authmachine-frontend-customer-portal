export interface RecoveryPasswordProps {
    status: boolean,
    message: string,
    match: {
        params: {
            token: string,
        },
    },
    recoveryPassword: (values: {
        password: string,
        confirmPassword: string,
        token: string
    }) => void,
    setPageTitle: (pageTitle: string) => void,
}