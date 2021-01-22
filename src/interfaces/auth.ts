export interface AuthProps {
    loading: boolean,
    match: {
        path: string,
    },
    isAuthenticated: boolean,
    initialLink: string,
    pageTitle: string,
}