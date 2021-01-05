import mainTypes from "../types/mainTypes";

type mainState = {
    pageTitle: string,
    loading: boolean,
    pageSize: string,
    showRightSider: boolean
}

const initialState: mainState = {
    pageTitle: '',
    loading: false,
    pageSize: "lg",
    showRightSider: false
}

type ActionType = {
    type: string,
    pageTitle: string,
    loading: boolean,
    pageSize: string,
    showRightSider: boolean
};

const mainReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case mainTypes.SET_TITLE:
            return {
                ...state,
                pageTitle: action.pageTitle
            };
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
        default:
            return state;
    }
};

export default mainReducer
