export interface AppProps {
    auth: () => void,
    user: {
        username?: string | null,
        id: number | null,
        avatar?: string | null,
        isAuthenticated: boolean
    },
    loading: boolean,
    eventsExists: boolean,
    pageTitle: string,
    getFeaturesList: () => void,
}

export interface AppState {
    collapsed: boolean,
    selectedMenuItems: string[],
}