interface RegistrationProps {
    isRegister: boolean,
    message: string,
    register: (values: {
        username: string,
        email: string,
        fullName: string,
        password: string,
        additionalRegistrationData: any
    }) => void,
    setPageTitle: (pageTitle: string) => void,
}

interface RegistrationStepsProps {
    isRegister: boolean,
    step: number,
    setPageTitle: (pageTitle: string) => void
}

interface RegisterStepOneProps {
    status: boolean,
    register: (values: {
        firstName: string,
        email: string
    }) => void,
    isRegister: boolean,
    message: string
}

interface RegisterStepTwoProps {
    status: boolean,
    register: (values: {
        id: string,
        activationCode: string
    }) => void,
    isRegister: boolean,
    message: string,
    id: string,
    changeMessage: (message: string) => void,
    changeStep: (step: number, message: string) => void
}

interface RegisterStepThreeProps {
    status: boolean,
    isRegister: boolean,
    message: string,
    register: (values: {
        userId: string,
        username: string,
        password: string
    }) => void,
    changeMessage: (message: string) => void,
    id: string
}

export type {RegisterStepOneProps, RegisterStepTwoProps, RegisterStepThreeProps, RegistrationStepsProps};
