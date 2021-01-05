export interface SitesEnabledProps {
    applications: any[],
    getApplications: () => void,
}

export interface SiteItemProps {
    item: {
        id: number,
        name: string,
        siteUrl: string,
    }
}