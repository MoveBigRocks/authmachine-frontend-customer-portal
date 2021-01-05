import userTypes from "../types/userTypes";

type UserState = {
    username?: string | null,
    id: number | null,
    avatar?: string | null,
    isAuthenticated: boolean,
    features: string[],
    eventsExists: boolean
}

const initialState: UserState = {
    username: null,
    id: null,
    isAuthenticated: false,
    avatar: null,
    features: [],
    eventsExists: false
}

type ActionType = {
    type: string,
    user: { username: string, id: number, photo: string },
    isAuthenticated?: boolean,
    data: any[]
}

const userReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case userTypes.USER_AUTH:
            return {
                ...state,
                isAuthenticated: false,
                user: action.user
            }
        case userTypes.USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.user.username,
                id: action.user.id,
                avatar: action.user.photo
            }
        case userTypes.USER_AUTH_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case userTypes.GET_FEATURES:
            return {
                ...state,
                features: action.data,
                eventsExists: action.data.includes("events")
            }
        default:
            return state;
    }
};

export default userReducer
