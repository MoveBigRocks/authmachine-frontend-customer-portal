import tfaTypes from '../types/tfaTypes'
import {ITFAResponse} from '../../interfaces/auth/tfaResponse'


export type usersState = {
    pinCodeData: ITFAResponse,
    pinCodeVerifyData: ITFAResponse,
    tokenVerifyData: ITFAResponse,
}

const initialState: usersState = {
    pinCodeData: {
        success: false,
        message: '',
    },
    pinCodeVerifyData: {
        success: false,
        message: '',
    },
    tokenVerifyData: {
        success: false,
        message: '',
    },
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
        default:
            return state
    }
}

export default tfaReducer