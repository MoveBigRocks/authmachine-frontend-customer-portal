export interface RegistrationProps {
    isRegister: boolean,
    message: string,
    register: (values: { username: string, email: string }) => void,
}