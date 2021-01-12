export interface AppProps {
    auth: () => void,
    user: {
        username?: string | null,
        id: number | null,
        avatar?: string | null,
        isAuthenticated: boolean
    },
    pageTitle: string,
}