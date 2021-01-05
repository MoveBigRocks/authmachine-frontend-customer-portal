import {getEventsData} from "../events";

export interface RecentActivityProps {
    events: any[],
    total: number,
    page: number,
    pageSize: number,
    getEvents: (data: getEventsData) => void,
    setPageTitle: (pageTitle: string) => void,
}