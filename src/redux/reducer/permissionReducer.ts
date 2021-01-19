import permissionTypes from "../types/permissionTypes";

type PermissionState = {
    permissions: any[],
}

const initialState: PermissionState = {
    permissions: [],
}

type ActionType = {
    type: string,
    data: any[]
}

const permissionReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case permissionTypes.GET_PERMISSIONS:
            return {
                ...state,
                permissions: action.data,
            }
        default:
            return state;
    }
};

export default permissionReducer;
