import {ISocialByUser} from "../socialsByUser";

export interface ILoginOptions {
    googleAuthenticatorValue: boolean | undefined,
    getGoogleAuthenticatorValue: () => void,
    socialsByUser: ISocialByUser[],
    getSocialsByUser: () => void
}