import userTypes from "../types/userTypes";

type UserState = {
    username?: string | null,
    id: number | null,
    avatar?: string | null,
    isAuthenticated: boolean,
    features: string[],
    eventsExists: boolean,
    message: string,
    operationStatus: boolean,
    activationFirstStepStatus: boolean,
    activationSecondStepStatus: boolean,
}

const initialState: UserState = {
    username: null,
    id: null,
    isAuthenticated: false,
    avatar: null,
    features: [],
    eventsExists: false,
    message: "",
    operationStatus: false,
    activationFirstStepStatus: false,
    activationSecondStepStatus: false,
}

type ActionType = {
    type: string,
    user: { username: string, id: number, photo: string },
    isAuthenticated?: boolean,
    data: any[],
    status: boolean,
    message?: string
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
                eventsExists: action.data.includes("events"),
            }
        case userTypes.USER_LOGOUT:
            return {
                ...state,
            }
        case userTypes.USER_LOGIN:
            return {
                ...state,
                isAuthenticated: action.status,
                message: action?.message || "",
            }
        case userTypes.RESET_PASSWORD:
        case userTypes.RECOVERY_PASSWORD:
        case userTypes.FINISH_ACTIVATION:
            return {
                ...state,
                operationStatus: action.status,
                message: action?.message || "",
            }
        case userTypes.ACTIVATION_FIRST_STEP:
            return {
                ...state,
                activationFirstStepStatus: action.status,
                message: action?.message || "",
            }
        case userTypes.ACTIVATION_SECOND_STEP:
            return {
                ...state,
                activationSecondStepStatus: action.status,
                message: action?.message || "",
            }
        default:
            return state;
    }
};

export default userReducer
