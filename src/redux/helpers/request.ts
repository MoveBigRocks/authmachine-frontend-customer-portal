import {authHeader, formDataHeader} from "./authHeaders";
import {AppDispatch} from "../store";
import {mainActions} from "../actions/mainActions";
import axios from "axios";
import {alertActions} from "../actions/alertActions";

const request = {
    post: (dispatch: AppDispatch, query: string, success?: (result: any) => void, error?: () => void) => {
        mainActions.loading(true, dispatch);
        axios.post('/api/graphql', {query}, authHeader())
            .then((result) => {
                let {data} = result;
                mainActions.loading(false, dispatch);
                if (data.hasOwnProperty('errors')) {
                    alertActions.error(data.errors[0].message);
                } else if (success) {
                    success(data);
                }
            })
            .catch((err: any) => {
                mainActions.loading(false, dispatch);
                alertActions.error(err);
                if (error) {
                    error();
                }
            })
    },
    postWithoutErrors: (dispatch: AppDispatch, query: string, success?: (result: any) => void, error?: () => void) => {
        mainActions.loading(true, dispatch);
        axios.post('/api/graphql', {query}, authHeader())
            .then((result) => {
                mainActions.loading(false, dispatch);
                if (success) success(result.data);
            })
            .catch((err: any) => {
                mainActions.loading(false, dispatch);
                if (error) error();
            })
    },
    postFormData: (dispatch: AppDispatch, data: any, success?: (result: any) => void, error?: () => void) => {
        mainActions.loading(true, dispatch);
        axios.post('/api/graphql', data, formDataHeader())
            .then((result) => {
                if (success) success(result.data);
                mainActions.loading(false, dispatch);
            })
            .catch((err: any) => {
                alertActions.error(err);
                if (error) error();
                mainActions.loading(false, dispatch);
            })
    },
}

export default request;