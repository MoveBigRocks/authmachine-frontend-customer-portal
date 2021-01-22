export interface ActivateAccountProps {
    activationFirstStepStatus: boolean,
    activationSecondStepStatus: boolean,
    message: string,
    activationFirstStep: (values: {
        username?: string,
        code: string,
    }) => void,
    activationSecondStep: (values: {
        password: string,
        confirmPassword: string,
        email: string,
        phone: string,
    }) => void,
    match: {
        path: string,
    },
    setPageTitle: (pageTitle: string) => void,
}