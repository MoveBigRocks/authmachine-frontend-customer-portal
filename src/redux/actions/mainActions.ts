import {AppDispatch} from "../store";
import mainTypes from "../types/mainTypes";

const setPageTitle = (pageTitle: string) => {
    return (dispatch: AppDispatch) => {
        // @ts-ignore
        dispatch({
            type: mainTypes.SET_TITLE,
            pageTitle
        })
    }
}

const loading = (loading: boolean, dispatch: AppDispatch) => {
    // @ts-ignore
    return dispatch({
        type: mainTypes.LOADING,
        loading
    })
}

const authLoading = (loading: boolean, dispatch: AppDispatch) => {
    // @ts-ignore
    return dispatch({
        type: mainTypes.AUTH_LOADING,
        loading
    })
}

const showRightSider = (showRightSider: boolean = false) => {
    return (dispatch: AppDispatch) => {
        // @ts-ignore
        dispatch({
            type: mainTypes.SHOW_RIGHT_SIDER,
            showRightSider
        })
    }
}

export const mainActions = {
    setPageTitle,
    loading,
    showRightSider,
    authLoading,
};