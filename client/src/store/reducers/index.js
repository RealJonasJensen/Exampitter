import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
    post: newsReducer
})