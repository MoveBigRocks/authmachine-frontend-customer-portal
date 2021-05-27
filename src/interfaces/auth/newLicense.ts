import {infoStatusResponse} from "../infoStatusResponse";

export interface newLicenseValues {
    licenseType: string,
    endUserType: string,
    email: string,
    endUserName: string,
}

export interface newLicenseProps {
    setPageTitle: (pageTitle: string) => void,
    newLicenseData: infoStatusResponse,
    requestNewLicense: (values: newLicenseValues) => void,
}