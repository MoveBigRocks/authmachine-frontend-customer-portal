import {authHeader, formDataHeader, getCookie} from "./authHeaders";
import {AppDispatch} from "../store";
import {mainActions} from "../actions/mainActions";
import axios from "axios";
import {alertActions} from "../actions/alertActions";


const request = {
    post: (dispatch: AppDispatch, query: string, success?: (result: any) => void, error?: (errorMessage?: any) => void) => {
        let url = request.getApiUrl();
        mainActions.loading(true, dispatch);
        axios.post(url, {query}, authHeader())
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
                if (error) error(err);
            });
    },
    postWithoutErrors: (dispatch: AppDispatch, query: string, success?: (result: any) => void, error?: (errorMessage?: any) => void) => {
        let url = request.getApiUrl();
        mainActions.loading(true, dispatch);
        axios.post(url, {query}, authHeader())
            .then((result) => {
                mainActions.loading(false, dispatch);
                if (success) success(result.data);
            })
            .catch((err: any) => {
                mainActions.loading(false, dispatch);
                if (error) error(err);
            });
    },
    postFormData: (dispatch: AppDispatch, data: any, success?: (result: any) => void, error?: (errorMessage?: any) => void) => {
        let url = request.getApiUrl();
        mainActions.loading(true, dispatch);
        axios.post(url, data, formDataHeader())
            .then((result) => {
                if (success) success(result.data);
                mainActions.loading(false, dispatch);
            })
            .catch((err: any) => {
                alertActions.error(err);
                if (error) error(err);
                mainActions.loading(false, dispatch);
            });
    },
    getApiUrl: () => "/api/graphql",
    isServerError: (error: any) =>
        (String(error).split("Error: ")[1] === "Request failed with status code 500"
            ? "Server error" : "Something wrong"),
    simplePost: (dispatch: AppDispatch, url: string, data: any, success?: (result: any) => void, error?: (errorMessage?: any) => void) => {
        mainActions.loading(true, dispatch);
        data["csrfmiddlewaretoken"] = getCookie("csrftoken");
        axios.post(url, data, authHeader())
            .then((result) => {
                mainActions.loading(false, dispatch);
                if (success) success(result.data);
            })
            .catch((err: any) => {
                mainActions.loading(false, dispatch);
                if (error) error(err);
            });
    },
}

export default request;