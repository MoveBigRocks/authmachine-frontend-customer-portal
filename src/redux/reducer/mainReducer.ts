import mainTypes from "../types/mainTypes";

type mainState = {
    pageTitle: string,
    loading: boolean,
    authLoading: boolean,
    pageSize: string,
    showRightSider: boolean
    pageLink: string,
};

const initialState: mainState = {
    pageTitle: '',
    loading: false,
    authLoading: true,
    pageSize: "lg",
    showRightSider: false,
    pageLink: "/",
};

type ActionType = {
    type: string,
    pageTitle: string,
    loading: boolean,
    pageSize: string,
    showRightSider: boolean,
    pageLink: string,
};

const mainReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case mainTypes.SET_TITLE:
            return {
                ...state,
                pageTitle: action.pageTitle
            }
        case mainTypes.SET_PAGE_LINK:
            return {
                ...state,
                pageLink: action.pageLink
            }
        case mainTypes.LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case mainTypes.SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            }
        case mainTypes.SHOW_RIGHT_SIDER:
            return {
                ...state,
                showRightSider: action.showRightSider
            }
        case mainTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.loading
            }
        default:
            return state;
    }
};

export default mainReducer;
