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
    username: string,
    isSuperuser: boolean,
    usersExists: boolean,
}