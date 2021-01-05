import {authHeader} from "./authHeaders";
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
    postWithErrors: (dispatch: AppDispatch, query: string, success?: (result: any) => void, error?: () => void) => {
        mainActions.loading(true, dispatch);
        axios.post('/api/graphql', {query}, authHeader())
            .then((result) => {
                mainActions.loading(false, dispatch);
                if (success) {
                    success(result.data)
                }
            })
            .catch((err: any) => {
                mainActions.loading(false, dispatch);
                alertActions.error(err);
                if (error) {
                    error();
                }
            })
    }
}

export default request;