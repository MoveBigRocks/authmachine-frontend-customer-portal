import {AppDispatch} from '../store'
import {mainActions} from './mainActions'
import tfaTypes from '../types/tfaTypes'
import request from '../helpers/request'


const getPinCode = (phone: string) => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `mutation sendPinCode {
            sendPinCode(userId: "${getState().user.id}", phone: "${phone}") {
                success,
                message
            }
        }`

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {pinCodeData} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.GET_PIN_CODE,
                    data: pinCodeData,
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
                let {pinCodeVerifyData} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.VERIFY_PIN_CODE,
                    data: pinCodeVerifyData,
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
                let {tokenVerifyData} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: tfaTypes.VERIFY_TOKEN,
                    data: tokenVerifyData,
                })
            },
            () => {
        })
    }
}


export const tfaActions = {
    getPinCode,
    verifyPinCode,
    verifyToken,
}