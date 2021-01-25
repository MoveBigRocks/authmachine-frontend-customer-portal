import {AppDispatch} from '../store'
import {mainActions} from './mainActions'
import tfaTypes from '../types/tfaTypes'
import request from '../helpers/request'
import {userActions} from "./userActions";


const getPinCode = (phone: string) => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `mutation sendPinCode {
            sendPinCode(userId: "${getState().user.id}", phone: "${phone}") {
                success,
                message
            }
        }`

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {sendPinCode} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.GET_PIN_CODE,
                    data: sendPinCode,
                })
            },
            () => {
        })
    }
}


const verifyPinCode = (phone: string, pin: string) => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `mutation verifyPinCode {
            verifyPinCode(userId: "${getState().user.id}", phone: "${phone}", pin: "${pin}") {
                success,
                message
            }
        }`

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {verifyPinCode} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.VERIFY_PIN_CODE,
                    data: verifyPinCode,
                })
            },
            () => {
        })
    }
}


const verifyToken = (token: string) => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `mutation verifyToken {
            verifyToken(userId: "${getState().user.id}", token: "${token}") {
                success,
                message
            }
        }`

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {verifyToken} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.VERIFY_TOKEN,
                    data: verifyToken,
                });
                // @ts-ignore
                if (verifyToken.success) dispatch(userActions.auth());
            },
            () => {
        })
    }
}

const disablePinCode = () => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          sendDisablePin {
            success, message
          }
        }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {sendDisablePin} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.SEND_DISABLE_PIN,
                    data: sendDisablePin,
                });
                // @ts-ignore
                // if (sendDisablePin.success) dispatch(userActions.auth());
            },
            () => {
        })
    }
};

const disableGoogleAuthenticator = (pinCode: string) => {
    return (dispatch: AppDispatch) => {
        let query = `mutation {
          disableGoogleAuthenticator (pin: "${pinCode}") {
            success, message
          }
        }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {disableGoogleAuthenticator} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.DISABLE_GOOGLE_AUTH,
                    data: disableGoogleAuthenticator,
                });
                // @ts-ignore
                // if (sendDisablePin.success) dispatch(userActions.auth());
            },
            () => {
        })
    }
};

const getBackupCodes = () => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          backupCodes
        }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {backupCodes} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.GET_BACKUP_CODES,
                    data: backupCodes,
                });
                // @ts-ignore
                // if (sendDisablePin.success) dispatch(userActions.auth());
            },
            () => {
        })
    }
};


export const tfaActions = {
    getPinCode,
    verifyPinCode,
    verifyToken,
    disablePinCode,
    disableGoogleAuthenticator,
    getBackupCodes,
}