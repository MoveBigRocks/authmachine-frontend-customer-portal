import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import applicationReducer from "./applicationReducer";
import eventReducer from "./eventReducer";
import permissionReducer from "./permissionReducer";

export const rootReducer = combineReducers({
    application: applicationReducer,
    event: eventReducer,
    main: mainReducer,
    permission: permissionReducer,
    user: userReducer,
    users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
