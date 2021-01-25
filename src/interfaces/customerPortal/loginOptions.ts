import {ISocialByUser} from '../socialsByUser'
import {ITFAResponse} from '../auth/tfaResponse'
import {IPhone} from "../phone";


export interface ILoginOptionsProps {
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
    getBackupCodes: () => void,
    backupCodes: [],
    disablePinCode: () => void,
    sendDisablePinData: ITFAResponse,
    clearVerificationState: () => void,
    disableGoogleAuthenticator: (pin: string) => void,
    disableGoogleAuthData: ITFAResponse,
    getUser: (userId: string) => void,
};

export interface IQRCodeProps {
    token: string,
    changeToken: (event: React.ChangeEvent<HTMLInputElement>) => void,
    submitToken: () => void,
};