import tfaTypes from '../types/tfaTypes'
import {ITFAResponse} from '../../interfaces/auth/tfaResponse'


export type usersState = {
    pinCodeData: ITFAResponse,
    pinCodeVerifyData: ITFAResponse,
    tokenVerifyData: ITFAResponse,
    sendDisablePinData: ITFAResponse,
    disableGoogleAuthData: ITFAResponse,
    backupCodes: string[],
}

const initialState: usersState = {
    pinCodeData: {
        success: null,
        message: '',
    },
    pinCodeVerifyData: {
        success: null,
        message: '',
    },
    tokenVerifyData: {
        success: null,
        message: '',
    },
    sendDisablePinData: {
        success: null,
        message: '',
    },
    disableGoogleAuthData: {
        success: null,
        message: '',
    },
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
                tokenVerifyData: action.data,
            }
        case tfaTypes.DISABLE_GOOGLE_AUTH:
            return {
                ...state,
                tokenVerifyData: action.data,
            }
        case tfaTypes.GET_BACKUP_CODES:
            return {
                ...state,
                backupCodes: action.data,
            }
        default:
            return state
    }
}

export default tfaReducer