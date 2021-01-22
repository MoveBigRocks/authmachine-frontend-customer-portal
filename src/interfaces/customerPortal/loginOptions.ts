import {ISocialByUser} from "../socialsByUser";

export interface ILoginOptions {
    googleAuthenticatorValue: boolean | undefined,
    socialLink: string,
    getGoogleAuthenticatorValue: () => void,
    socialsByUser: ISocialByUser[],
    getSocialsByUser: () => void,
    disconnectSocialAccount: (accountId: number) => void,
    getSocialLink: (provider: string, connectionType: string) => void,
}