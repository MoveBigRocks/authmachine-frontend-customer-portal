import {AppDispatch} from "../store";
import {mainActions} from "./mainActions";
import request from '../helpers/request';
import {getEventsData} from "../../interfaces/events";
import eventTypes from "../types/eventTypes";

const getEvents = (data: getEventsData) => {
    return (dispatch: AppDispatch, getState: any) => {
        let {page, pageSize, eventType, dateRange} = getState().event;
        if (data.hasOwnProperty('page')) page = data.page;
        if (data.hasOwnProperty('pageSize')) pageSize = data.pageSize;
        if (data.hasOwnProperty('eventType')) eventType = data.eventType;
        if (data.hasOwnProperty('dateRange')) dateRange = data.dateRange;

        let additionalQuery = "";
        if (eventType !== "all") additionalQuery += `eventType: "${eventType}", `;
        if (dateRange && dateRange.length > 1) additionalQuery += `dateStart: "${dateRange[0]}", dateEnd: "${dateRange[1]}", `;
        let query = `query {
          allEventsPaginate(page: ${page},
          pageSize: ${pageSize}, ${additionalQuery}) {
            total,
            objects {
              id,
              type,
              createdAt,
              user {
                id,
                username
              },
              device {
                id,
                identifier,
                fingerprint,
                type,
                name,
                operatingSystem
              }
            }
          }
        }`;

        request.post(dispatch, query, (data: any) => {
            let {allEventsPaginate} = data.data;
            mainActions.loading(false, dispatch);
            dispatch({
                type: eventTypes.GET_EVENTS,
                data: allEventsPaginate.objects,
                total: allEventsPaginate.total,
                page,
                pageSize,
                eventType
            });
        })
    }
}


export const eventActions = {
    getEvents,
};