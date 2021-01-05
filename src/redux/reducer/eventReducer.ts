import {EventInterface} from "../../interfaces/events";
import eventTypes from "../types/eventTypes";

export type eventState = {
    page: number,
    pageSize: number,
    eventType: string,
    events: EventInterface[],
    total: number,
    dateRange: any[],
}

const initialState: eventState = {
    total: 0,
    page: 1,
    pageSize: 10,
    events: [],
    eventType: "all",
    dateRange: [],
}

type ActionType = {
    type: string,
    data?: any[],
    total?: number,
    page?: number,
    pageSize?: number,
    eventType?: string,
    dateRange?: any[]
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
            };
        default:
            return state;
    }
};

export default eventReducer;
