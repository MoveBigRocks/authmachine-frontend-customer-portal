import usersTypes from "../types/usersTypes";
import {UserInterface} from "../../interfaces/user";
import {GroupInterface} from "../../interfaces/group";
import {EventInterface} from "../../interfaces/events";
import {SocialInterface} from "../../interfaces/socials";

export type usersState = {
    usersTotal: number,
    page: number,
    pageSize: number,
    username: string,
    orderBy: string,
    users: [],
    userId: string | null,
    onlyLocked: boolean,
    onlyAdmin: boolean,
    operationStatus: boolean,
    groups: GroupInterface[],
    groupsSelected: string[],
    user: null | UserInterface,
    events: EventInterface[],
    socials: SocialInterface[],
}

const initialState: usersState = {
    usersTotal: 0,
    page: 1,
    pageSize: 10,
    username: "",
    orderBy: "-created_at",
    users: [],
    userId: null,
    onlyLocked: false,
    onlyAdmin: false,
    user: null,
    operationStatus: true,
    groups: [],
    groupsSelected: [],
    events: [],
    socials: [],
}

type ActionType = {
    // id: number,
    userId?: string,
    type: string,
    data?: any[],
    usersTotal?: number,
    page?: number,
    pageSize?: number,
    username?: string,
    orderBy?: string,
    onlyLocked?: boolean,
    onlyAdmin?: boolean,
    user?: UserInterface,
    operationStatus?: boolean,
    groupsSelected?: string[],
}

const usersReducer = (state = initialState, action: ActionType) => {
    // let users = state.users;
    switch (action.type) {
        case usersTypes.GET_USERS:
            return {
                ...state,
                users: action.data,
                usersTotal: action.usersTotal,
                page: action.page,
                pageSize: action.pageSize,
                onlyLocked: action.onlyLocked,
                onlyAdmin: action.onlyAdmin,
                username: action.username,
                groupsSelected: action.groupsSelected,
                orderBy: action.orderBy,
            };
        case usersTypes.GET_GROUPS:
            return {
                ...state,
                groups: action.data
            }
        case usersTypes.CHANGE_USER_PASSWORD:
        case usersTypes.UPDATE_OPERATION_STATUS:
            return {
                ...state,
                operationStatus: action.operationStatus
            }
        case usersTypes.GET_EVENTS:
            return  {
                ...state,
                events: action.data
            }
        case usersTypes.GET_USER:
        case usersTypes.SET_USER:
        case usersTypes.UPDATE_USER:
            return {
                ...state,
                user: action.user
            }
        case usersTypes.GET_SOCIALS:
            return {
                ...state,
                socials: action.data,
            }
        default:
            return state;
    }
};

export default usersReducer
