import * as actionTypes from "../actions/actionTypes";

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERRORS:
            return action.payload
        default:
            return state;
    }
}