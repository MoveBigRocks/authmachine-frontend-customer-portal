export interface ActivateFinishProps {
    status: boolean,
    message: string,
    finishActivation: (token: string) => void,
    match: {
        params: {
            token: string,
        }
    }
}