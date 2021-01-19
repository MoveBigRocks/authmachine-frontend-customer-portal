export interface CustomerPortalProps {
    user: {
        username?: string | null,
        id: number | null,
        avatar?: string | null,
        isAuthenticated: boolean
    },
    loading: boolean,
    eventsExists: boolean,
    pageTitle: string,
    isAuthenticated: boolean,
    getFeaturesList: () => void,
    match: {
        path: string,
    },
    logout: () => void,
    setPageLink: (pageLink: string) => void,
}

export interface CustomerPortalState {
    collapsed: boolean,
    selectedMenuItems: string[],
}