import {ISocialByUser} from '../socialsByUser'
import {infoStatusResponse} from '../infoStatusResponse';
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

    pinCodeData: infoStatusResponse,
    pinCodeVerifyData: infoStatusResponse,
    tokenVerifyData: infoStatusResponse,
    getPinCode: (phone: string) => void,
    verifyPinCode: (phone: string, pin: string) => void,
    verifyToken: (token: string) => void,
    phones: IPhone[],
    googleAuthenticatorTested: boolean,
    getBackupCodes: () => void,
    backupCodes: [],
    disablePinCode: () => void,
    sendDisablePinData: infoStatusResponse,
    clearVerificationState: () => void,
    disableGoogleAuthenticator: (pin: string) => void,
    disableGoogleAuthData: infoStatusResponse,
    getUser: (userId: string) => void,
};

export interface IQRCodeProps {
    token: string,
    changeToken: (event: React.ChangeEvent<HTMLInputElement>) => void,
    submitToken: () => void,
};