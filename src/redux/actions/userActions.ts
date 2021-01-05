import {typedAction} from "./action";
import userTypes from "../types/userTypes";
import axios from "axios";
import {authHeader} from "../helpers/authHeaders";
import {AppDispatch} from "../store";
import {alertActions} from "./alertActions";
import request from "../helpers/request";

const auth = () => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          user (id: "me") {
            id,
            username,
            displayName
            isActive,
            isSuperuser,
            photos {
              type,
              value,
              image
            }
          }
        }`

        request.post(dispatch, query, (data: any) => {
            dispatch({
                type: userTypes.USER_AUTH_SUCCESS,
                user: data.data.user,
                isAuthenticated: true
            });
        });
    }
}

const authSuccess = () => {
  return typedAction(userTypes.USER_AUTH_SUCCESS);
};

const authFailure = () => {
  return typedAction(userTypes.USER_AUTH_FAILURE);
};

const getFeaturesList = () => {
    const headers = authHeader();

    return (dispatch: AppDispatch) => {
        axios.get('/api/v1/admin/features', headers)
            .then((result) => {
                dispatch({
                    type: userTypes.GET_FEATURES,
                    data: result.data
                });
            })
            .catch((err: any) => alertActions.error(err))
    }
}

export const userActions = {
    auth,
    authSuccess,
    authFailure,
    getFeaturesList,
};