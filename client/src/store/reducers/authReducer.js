import * as actions from "../actions/actionTypes";
import isEmpty from "../../utility/isEmpty";

const initialState = {
    isAuthenticated: false,
    user: {},
    loadingLogin: false,
    loadingRegister: false,
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
        case actions.REGISTER_USER_START:
            return {
                ...state,
                loadingRegister: true,
                error: {}
            }
        case actions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loadingRegister: false,
                error: {}
            }
        case actions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loadingRegister: false,
                error: action.payload
            }
        case actions.LOGIN_USER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case actions.LOGIN_START:
            return {
                ...state,
                loadingLogin: true
            }
        case actions.LOGIN_END:
            return {
                ...state,
                loadingLogin: false
            }
        default:
            return state;
    }
}