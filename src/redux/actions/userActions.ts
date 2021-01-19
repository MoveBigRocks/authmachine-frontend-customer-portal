import {typedAction} from "./action";
import userTypes from "../types/userTypes";
import axios from "axios";
import {authHeader} from "../helpers/authHeaders";
import {AppDispatch} from "../store";
import {alertActions} from "./alertActions";
import {mainActions} from "./mainActions";
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
        }`;

        axios.post(request.getApiUrl(true), {query}, authHeader())
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
};

const logout = () => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          logout {
            status
          }
        }`;

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {status} = result.data.logout;
                dispatch({
                    type: userTypes.USER_LOGOUT,
                    status
                });
                // @ts-ignore
                if (status) dispatch(userActions.auth());
            },
            () => {
                dispatch({
                    type: userTypes.USER_LOGOUT,
                    status: false
                });
            },
            false);
    }
};

const login = (values: {username: string, password: string, remember: boolean}) => {
    const {username, password, remember} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          login(input: {
            username: "${username}",
            password: "${password}",
            rememberMe: ${remember}
          }) {
            success, message
          }
        }`;

        const setLogin = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.USER_LOGIN,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.login;

                if (success) {
                    // @ts-ignore
                    dispatch(userActions.auth());
                    setLogin(true);
                } else {
                    setLogin(false, message);
                }
            },
            () => setLogin(false, "Something wrong"),
            false);
    }
};

const resetPassword = (values: {username: string}) => {
    const {username} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          resetPassword(input: {
            username: "${username}"
          }) {
            success, message
          }
        }`;

        const setResetStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.RESET_PASSWORD,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.resetPassword;

                setResetStatus(success, message);
            },
            () => setResetStatus(false, "Something wrong"),
            false);
    }
};

const recoveryPassword = (values: { password: string, confirmPassword: string, token: string }) => {
    const {password, confirmPassword, token} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          recoveryPassword(input: {
            password: "${password}",
            confirmPassword: "${confirmPassword}",
            token: "${token}",
          }) {
            success, message
          }
        }`;

        const setRecoveryStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.RECOVERY_PASSWORD,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.recoveryPassword;

                // @ts-ignore
                if (success) dispatch(userActions.auth());
                setRecoveryStatus(success, message);
            },
            () => setRecoveryStatus(false, "Something wrong"),
            false);
    }
};

const activationFirstStep = (values: { username?: string, code: string }) => {
    const {username, code} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          activationFirstStep(input: {
            code: "${code}",
            ${username ? `username: "${username}",` : ""}
          }) {
            success, message
          }
        }`;

        const setActivationStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.ACTIVATION_FIRST_STEP,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.activationFirstStep;
                setActivationStatus(success, success ? "" : message);
            },
            () => setActivationStatus(false, "Something wrong"),
            false);
    }
};

const activationSecondStep = (values: { password: string, confirmPassword: string, email: string, phone: string }) => {
    const {password, confirmPassword, email, phone} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          activationSecondStep(input: {
            password: "${password}",
            confirmPassword: "${confirmPassword}",
            email: "${email}",
            phone: "${phone}"
          }) {
            success,
            message
          }
        }`;

        const setActivationStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.ACTIVATION_SECOND_STEP,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.activationSecondStep;
                setActivationStatus(success, message);
            },
            () => setActivationStatus(false, "Something wrong"),
            false);
    }
};

const finishActivation = (token: string) => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          finishActivation(token: "${token}") {
            success, message
          }
        }`;

        const setFinishActivationStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.FINISH_ACTIVATION,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.finishActivation;

                setFinishActivationStatus(success, message);
            },
            () => setFinishActivationStatus(false, "Something wrong"),
            false);
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
    login,
    authSuccess,
    authFailure,
    getFeaturesList,
    logout,
    resetPassword,
    recoveryPassword,
    activationFirstStep,
    activationSecondStep,
    finishActivation,
};