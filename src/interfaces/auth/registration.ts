export interface RegistrationProps {
    isRegister: boolean,
    message: string,
    register: (values: {
        username: string,
        email: string,
        fullName: string,
        password: string,
        additionalRegistrationData: any
    }) => void,
    setPageTitle: (pageTitle: string) => void,
}