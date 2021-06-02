interface ResetPasswordProps {
    step: number,
    setPageTitle: (pageTitle: string) => void,
}

interface ResetPasswordStepOneProps {
    status: boolean,
    resetPasswordStepOne: (values: {username: string}) => void,

}

interface ResetPasswordStepTwoProps {
    status: boolean,
    resetPasswordStepTwo: (values: {code: string, id: string}) => void
}

interface ResetPasswordStepThreeProps {
    status: boolean,
    resetPasswordStepThree: (values: {password: string, confirmPassword: string, id: string}) => void
}

export type {ResetPasswordProps, ResetPasswordStepOneProps, ResetPasswordStepTwoProps, ResetPasswordStepThreeProps};
