import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
    page: pageReducer
})