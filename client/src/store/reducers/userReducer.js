import * as actions from "../actions/actionTypes";

const initialState = {
    id: null,
    avatar: null,
    username: null,
    email: null,
    followers: [],
    following: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                avatar: action.payload.avatar,
                username: action.payload.username,
                email: action.payload.email,
                followers: action.payload.followers,
                following: action.payload.following
            }
        case actions.CLEAR_USER:
            return {
                id: null,
                avatar: null,
                username: null,
                email: null,
                followers: [],
                following: [],
            }
        default:
            return state;
    }
}