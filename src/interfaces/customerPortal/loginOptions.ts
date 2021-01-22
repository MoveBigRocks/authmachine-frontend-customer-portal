import {ISocialByUser} from '../socialsByUser'
import {ITFAResponse} from '../auth/tfaResponse'


export interface ILoginOptions {
    // googleAuthenticatorValue: boolean | undefined,
    googleAuthenticatorValue: boolean,
    socialsByUser: ISocialByUser[],
    getGoogleAuthenticatorValue: () => void,
    getSocialsByUser: () => void,

    pinCodeData: ITFAResponse,
    pinCodeVerifyData: ITFAResponse,
    tokenVerifyData: ITFAResponse,
    getPinCode: (phone: string) => void,
    verifyPinCode: (phone: string, pin: string) => void,
    verifyToken: (token: string) => void,
}