import userTypes from "../types/userTypes";

type UserState = {
    username?: string | null,
    id: number | null,
    avatar?: string | null,
    isAuthenticated: boolean,
    features: string[],
    policies: any[],
    eventsExists: boolean,
    message: string,
    registerMessage: string,
    loginMessage: string,
    activateMessage: string,
    operationStatus: boolean,
    isRegister: boolean,
    activationFirstStepStatus: boolean,
    activationSecondStepStatus: boolean,
    socialLink: string,
    isSuperUser: boolean | null,
}

const initialState: UserState = {
    username: null,
    id: null,
    isAuthenticated: false,
    isRegister: false,
    avatar: null,
    features: [],
    policies: [],
    eventsExists: false,
    message: "",
    registerMessage: "",
    loginMessage: "",
    activateMessage: "",
    operationStatus: false,
    activationFirstStepStatus: false,
    activationSecondStepStatus: false,
    socialLink: "",
    isSuperUser: null,
}

type ActionType = {
    type: string,
    user: { username: string, id: number, avatar: string, isSuperuser: boolean },
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
                user: action.user,
            }
        case userTypes.USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.user.username,
                id: action.user.id,
                avatar: action.user.avatar,
                user: action.user,
                isSuperUser: action.user.isSuperuser,
            }
        case userTypes.USER_AUTH_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                isSuperUser: false,
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
                loginMessage: action?.message || "",
                isSuperUser: action.user.isSuperuser,
            }
        case userTypes.USER_REGISTER:
            return {
                ...state,
                isRegister: action.status,
                registerMessage: action.message
            }
        case userTypes.RESET_PASSWORD:
        case userTypes.RECOVERY_PASSWORD:
        case userTypes.FINISH_ACTIVATION:
        case userTypes.SOCIAL_CALLBACK:
            return {
                ...state,
                operationStatus: action.status,
                message: action?.message || "",
            }
        case userTypes.ACTIVATION_FIRST_STEP:
            return {
                ...state,
                activationFirstStepStatus: action.status,
                activateMessage: action?.message || "",
            }
        case userTypes.ACTIVATION_SECOND_STEP:
            return {
                ...state,
                activationSecondStepStatus: action.status,
                activateMessage: action?.message || "",
            }
        case userTypes.GET_POLICIES:
            return {
                ...state,
                policies: action.data,
            }
        case userTypes.SOCIAL_LINK:
            return {
                ...state,
                socialLink: action.message
            }
        case userTypes.DISCONNECT_SOCIAL_ACCOUNT:
            return {
                ...state,
                operationStatus: action.status,
            }
        default:
            return state;
    }
};

export default userReducer;
