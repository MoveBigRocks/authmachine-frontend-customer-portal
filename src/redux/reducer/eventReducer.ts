import {EventInterface} from "../../interfaces/events";
import eventTypes from "../types/eventTypes";

export type eventState = {
    page: number,
    pageSize: number,
    eventType: string,
    events: EventInterface[],
    total: number,
    dateRange: any[],
    eventsAvailable: boolean,
    notAvailableReason: string,
}

const initialState: eventState = {
    total: 0,
    page: 1,
    pageSize: 10,
    events: [],
    eventType: "all",
    dateRange: [],
    eventsAvailable: false,
    notAvailableReason: "",
}

type ActionType = {
    type: string,
    data?: any[],
    total?: number,
    page?: number,
    pageSize?: number,
    eventType?: string,
    dateRange?: any[],
    eventsAvailable: boolean,
    notAvailableReason: string,
}

const eventReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case eventTypes.GET_EVENTS:
            return {
                ...state,
                events: action.data,
                total: action.total,
                page: action.page,
                pageSize: action.pageSize,
                eventType: action.eventType,
                dateRange: action.dateRange,
                eventsAvailable: true
            };
        case eventTypes.EVENTS_NOT_AVAILABLE:
            return {
                ...state,
                eventsAvailable: false,
                notAvailableReason: action.notAvailableReason,
            }
        default:
            return state;
    }
};

export default eventReducer;
