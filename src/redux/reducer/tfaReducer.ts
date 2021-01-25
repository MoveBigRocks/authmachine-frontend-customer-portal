import tfaTypes from '../types/tfaTypes';
import {ITFAResponse} from '../../interfaces/auth/tfaResponse';

const emptyMessage = {
    success: null,
    message: '',
};

export type usersState = {
    pinCodeData: ITFAResponse,
    pinCodeVerifyData: ITFAResponse,
    tokenVerifyData: ITFAResponse,
    sendDisablePinData: ITFAResponse,
    disableGoogleAuthData: ITFAResponse,
    backupCodes: string[],
}

const initialState: usersState = {
    pinCodeData: emptyMessage,
    pinCodeVerifyData: emptyMessage,
    tokenVerifyData: emptyMessage,
    sendDisablePinData: emptyMessage,
    disableGoogleAuthData: emptyMessage,
    backupCodes: [],
}

type ActionType = {
    type: string,
    data?: any[],
}


const tfaReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case tfaTypes.GET_PIN_CODE:
            return {
                ...state,
                pinCodeData: action.data,
            }
        case tfaTypes.VERIFY_PIN_CODE:
            return {
                ...state,
                pinCodeVerifyData: action.data,
            }
        case tfaTypes.VERIFY_TOKEN:
            return {
                ...state,
                tokenVerifyData: action.data,
            }
        case tfaTypes.SEND_DISABLE_PIN:
            return {
                ...state,
                sendDisablePinData: action.data,
            }
        case tfaTypes.DISABLE_GOOGLE_AUTH:
            return {
                ...state,
                disableGoogleAuthData: action.data,
            }
        case tfaTypes.GET_BACKUP_CODES:
            return {
                ...state,
                backupCodes: action.data,
            }
        case tfaTypes.CLEAR_VERIFICATION_STATE:
            return {
                ...state,
                pinCodeData: emptyMessage,
                pinCodeVerifyData: emptyMessage,
                tokenVerifyData: emptyMessage,
            }
        default:
            return state
    }
}

export default tfaReducer