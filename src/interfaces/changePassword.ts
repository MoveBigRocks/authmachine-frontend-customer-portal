export interface ChangePasswordProps {
    loading: boolean,
    operationStatus: boolean,
    history: {
        goBack: () => void,
        push: (path: string) => void
    },
    changeUserPassword: (userId: string, password: string) => void,
    match: {
        params: {
            id: string
        }
    }
}
export interface ChangePasswordState {
    password: string,
    confirmPassword: string,
    showPassword: boolean
}