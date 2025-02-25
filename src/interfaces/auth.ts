export interface AuthProps {
    loading: boolean,
    match: {
        path: string,
    },
    isAuthenticated: boolean,
    initialLink: string,
    usersExists: boolean,
}