import * as actions from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        default:
            return state;
    }
}