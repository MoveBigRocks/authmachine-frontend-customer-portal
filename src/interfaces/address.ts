export interface AddressInterface {
    id?: string,
    formatted: string | null,
    country: string,
    locality: string,
    postalCode: string,
    primary: boolean,
    region: string,
    streetAddress: string,
    type: string,
}