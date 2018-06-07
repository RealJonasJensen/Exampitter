import * as actions from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}