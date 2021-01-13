import {typedAction} from "./action";
import userTypes from "../types/userTypes";
import axios from "axios";
import {authHeader} from "../helpers/authHeaders";
import {AppDispatch} from "../store";
import {alertActions} from "./alertActions";
import {mainActions} from "./mainActions";

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
        }`;

        axios.post('/api/graphql', {query}, authHeader())
            .then((result) => {
                mainActions.authLoading(false, dispatch);
                try {
                    dispatch({
                        type: userTypes.USER_AUTH_SUCCESS,
                        user: result.data.data.user,
                        isAuthenticated: true
                    });
                } catch (Exception) {
                    dispatch({
                        type: userTypes.USER_AUTH_FAILURE,
                        isAuthenticated: false
                    });
                }
            })
            .catch((err: any) => {
                mainActions.authLoading(false, dispatch);
                dispatch({
                    type: userTypes.USER_AUTH_FAILURE,
                    isAuthenticated: false
                })
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
            .catch((err: any) => alertActions.error(err));
    }
}

export const userActions = {
    auth,
    authSuccess,
    authFailure,
    getFeaturesList,
};