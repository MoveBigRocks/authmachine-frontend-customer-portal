export interface ActivateFinishProps {
    status: boolean,
    message: string,
    finishActivation: (token: string) => void,
    match: {
        params: {
            token: string,
        }
    },
    setPageTitle: (pageTitle: string) => void,
    setSystemInformation: (info: {
        show: boolean,
        title: string,
        description: string,
        success: boolean,
    }) => void,
}