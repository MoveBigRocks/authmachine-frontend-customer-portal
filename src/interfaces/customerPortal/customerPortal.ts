export interface CustomerPortalProps {
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
    match: {
        path: string,
    },
}

export interface CustomerPortalState {
    collapsed: boolean,
    selectedMenuItems: string[],
}