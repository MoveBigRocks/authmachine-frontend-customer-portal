import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import applicationReducer from "./applicationReducer";
import eventReducer from "./eventReducer";

export const rootReducer = combineReducers({
    application: applicationReducer,
    main: mainReducer,
    user: userReducer,
    users: usersReducer,
    event: eventReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
