import {ISocialByUser} from '../socialsByUser'
import {ITFAResponse} from '../auth/tfaResponse'
import {IPhone} from "../phone";

export interface ILoginOptions {
    googleAuthenticatorValue: boolean | undefined,
    socialLink: string,
    getGoogleAuthenticatorValue: () => void,
    socialsByUser: ISocialByUser[],
    getSocialsByUser: () => void,
    disconnectSocialAccount: (accountId: number) => void,
    getSocialLink: (provider: string, connectionType: string) => void,
    setPageTitle: (pageTitle: string) => void,

    pinCodeData: ITFAResponse,
    pinCodeVerifyData: ITFAResponse,
    tokenVerifyData: ITFAResponse,
    getPinCode: (phone: string) => void,
    verifyPinCode: (phone: string, pin: string) => void,
    verifyToken: (token: string) => void,
    phones: IPhone[],
    googleAuthenticatorTested: boolean,
}