export interface SitesEnabledProps {
    applications: any[],
    getApplications: () => void,
    setPageTitle: (pageTitle: string) => void,
}

export interface SiteItemProps {
    item: {
        id: number,
        name: string,
        siteUrl: string,
    }
}