export interface SignInProps {
    isAuthenticated: boolean,
    message: string,
    login: (values: any) => void,
}