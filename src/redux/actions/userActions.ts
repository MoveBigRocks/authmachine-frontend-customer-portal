import {typedAction} from "./action";
import userTypes from "../types/userTypes";
import axios from "axios";
import {authHeader} from "../helpers/authHeaders";
import {AppDispatch} from "../store";
import {mainActions} from "./mainActions";
import request from "../helpers/request";
import {alertActions} from "./alertActions";
import {usersActions} from "./usersActions";
import {newLicenseValues} from "../../interfaces/auth/newLicense";


const auth = () => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          user (id: "me") {
            id,
            googleAuthenticatorTested,
            username,
            displayName
            isActive,
            isSuperuser,
            avatar,
            photos {
              type,
              value,
              image
            },
            phoneNumbers {
              id,
              value,
              type
            },
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

const login = (values: {username: string, password: string, remember: boolean, policies: string[]}, nextUrl: null | string = null) => {
    const {username, password, remember, policies} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          login(input: {
            username: "${username}",
            password: "${password}",
            rememberMe: ${remember},
            policies: [${policies.map(p => `"${p}"`)}]
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
                    if (nextUrl) {
                        window.location.replace(nextUrl);
                    } else {
                        // @ts-ignore
                        dispatch(userActions.auth());
                        setLogin(true);
                    }
                } else {
                    setLogin(false, message);
                }
            },
            (error: any) => {
                error = request.isServerError(error);
                setLogin(false, error)
            },
            false);
    }
};

const register = (values: {username: string, email: string}) => {
    const {username, email} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          register(input: {
            username: "${username}",
            email: "${email}",
          }) {
            success, message
          }
        }`;

        const setRegister = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.USER_REGISTER,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.register;
                setRegister(success, message);
            },
            (error: any) => {
                error = request.isServerError(error);
                setRegister(false, error);
            },
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
            (error: any) => {
                error = request.isServerError(error);
                setResetStatus(false, error);
            },
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
            (error: any) => {
                error = request.isServerError(error);
                setRecoveryStatus(false, error);
            },
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
            (error: any) => {
                error = request.isServerError(error);
                setActivationStatus(false, error);
            },
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
            (error: any) => {
                error = request.isServerError(error);
                setActivationStatus(false, error);
            },
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
            (error: any) => {
                error = request.isServerError(error);
                setFinishActivationStatus(false, error)
            },
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
            .catch();
    }
}

const getPrivacyPolicyList = () => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          allPolicies {
            id,
            title,
            acceptOnActivation,
            acceptOnLogin,
            htmlBody
          }
        }`;

        const updatePolicies = (data: any[]) =>
            dispatch({
                type: userTypes.GET_POLICIES,
                data,
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {allPolicies} = result.data;
                updatePolicies(allPolicies);
            },
            () => updatePolicies([]),
            false);
    }
}

const socialCallback = (provider: string, queryString: string) => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          socialCallback(provider: "${provider}", queryString: "${queryString}") {
            success,
            message
          }
        }`;

        const setSocialCallbackStatus = (status: boolean, message: string = "") =>
            dispatch({
                type: userTypes.SOCIAL_CALLBACK,
                status,
                message
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.socialCallback;

                // @ts-ignore
                if (success) dispatch(userActions.auth());

                setSocialCallbackStatus(success, success ? "" : message);
            },
            (error: any) => {
                error = request.isServerError(error);
                setSocialCallbackStatus(false, error);
            },
            false);
    }
}

const disconnectSocialAccount = (accountId: number) => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          accountDisconnect(accountId: ${accountId}) {
            success, message
          }
        }`;

        const setDisconnectAccount = (status: boolean) =>
            dispatch({
                type: userTypes.DISCONNECT_SOCIAL_ACCOUNT,
                status,
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {success, message} = result.data.accountDisconnect;

                if (success) {
                    alertActions.success(message);
                    // @ts-ignore
                    dispatch(usersActions.getSocialsByUser());
                } else {
                    alertActions.error(message);
                }

                setDisconnectAccount(success);
            },
            (error: any) => {
                error = request.isServerError(error);
                alertActions.error(error);
            },
            true);
    }
}

const getSocialLink = (provider: string, connectionType: string = "login") => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          getProviderLink(provider: "${provider}", connectionType: "${connectionType}")
        }`;

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let message = result.data.getProviderLink;

                dispatch({
                    type: userTypes.SOCIAL_LINK,
                    message
                });
            },
            () => {},
            false);
    }
}

const activateLicense = (values: { activationCode: string }) => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          activateLicense(input: {
            activationCode: "${values.activationCode}"
          }) {
            success, message
          }
        }`;

        const setActivationStatus = (infoStatus: {status: boolean, message: string}) =>
            dispatch({
                type: userTypes.ACTIVATE_LICENSE,
                infoStatus
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {activateLicense} = result.data;
                setActivationStatus(activateLicense);
            },
            (error: any) => {
                error = request.isServerError(error);
                setActivationStatus({status: false, message: error});
            },
            false);
    }
};

const requestNewLicense = (values: newLicenseValues) => {
    const {email, endUserName, endUserType, licenseType} = values;
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          newLicense(input: {
            licenseType: "${licenseType}",
            endUserType: "${endUserType}",
            endUserName: "${endUserName}",
            email: "${email}"
          }) {
            success, message
          }
        }`;

        const setStatus = (infoStatus: {status: boolean, message: string}) =>
            dispatch({
                type: userTypes.NEW_LICENSE,
                infoStatus
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {newLicense} = result.data;
                setStatus(newLicense);
            },
            (error: any) => {
                error = request.isServerError(error);
                setStatus({status: false, message: error});
            },
            false);
    }
};

export const userActions = {
    auth,
    login,
    register,
    authSuccess,
    authFailure,
    getFeaturesList,
    logout,
    resetPassword,
    recoveryPassword,
    activationFirstStep,
    activationSecondStep,
    finishActivation,
    getPrivacyPolicyList,
    socialCallback,
    getSocialLink,
    disconnectSocialAccount,
    activateLicense,
    requestNewLicense,
};