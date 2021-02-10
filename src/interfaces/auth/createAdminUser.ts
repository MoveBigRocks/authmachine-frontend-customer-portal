export interface createAdminUserValues {
    username: string,
    email: string,
    password: string,
    confirm_password: string,
}

export interface CreateAdminUserProps {
    operationStatus: boolean,
    message: string,
    createAdminUser: (values: createAdminUserValues) => void,
    setPageTitle: (pageTitle: string) => void,
}