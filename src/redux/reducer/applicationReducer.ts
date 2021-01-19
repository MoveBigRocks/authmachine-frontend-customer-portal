import applicationTypes from "../types/applicationTypes";

type ApplicationState = {
    applications: any[],
}

const initialState: ApplicationState = {
    applications: [],
}

type ActionType = {
    type: string,
    data: any[]
}

const applicationReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case applicationTypes.GET_APPLICATIONS:
            return {
                ...state,
                applications: action.data,
            }
        default:
            return state;
    }
};

export default applicationReducer;
