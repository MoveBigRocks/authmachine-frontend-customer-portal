import {infoStatusResponse} from "../infoStatusResponse";


export interface ActivateLicenseProps {
    setPageTitle: (pageTitle: string) => void,
    activateLicenseData: infoStatusResponse,
    activateLicense: (values: { activationCode: string }) => void,
}