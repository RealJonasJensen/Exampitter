import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
    news: newsReducer,
    page: pageReducer
})