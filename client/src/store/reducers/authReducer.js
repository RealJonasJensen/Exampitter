import * as actions from "../actions/actionTypes";
import isEmpty from "../../utility/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {},
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                error: {}
            }
        case actions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                error: {}
            }
        case actions.REGISTER_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case actions.LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}