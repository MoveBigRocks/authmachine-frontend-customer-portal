import {getEventsData} from "../events";

export interface RecentActivityProps {
    events: any[],
    total: number,
    page: number,
    pageSize: number,
    eventsAvailable: boolean,
    notAvailableReason: string,
    loading: boolean,
    getEvents: (data: getEventsData) => void,
    setPageTitle: (pageTitle: string) => void,
}