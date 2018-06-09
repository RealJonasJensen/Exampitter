import * as actions from "../actions/actionTypes";

const initialState = {
    posts: [],
    topUsers: [],
    newUsers: [],
    loadingTop: false,
    loadingPosts: false,
    loadingNew: false,
    errorTop: null,
    errorNew: null,
    errorPosts: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_TOP_USERS_START:
            return {
                ...state,
                loadingTop: true,
            }
        case actions.GET_TOP_USERS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                topUsers: action.payload,
                loadingTop: false,
            }
        case actions.GET_TOP_USERS_FAILURE:
            return {
                ...state,
                loadingTop: false,
                errorTop: action.payload,
            }
        case actions.GET_NEW_USERS_START:
            return {
                ...state,
                loadingNew: true,
            }
        case actions.GET_NEW_USERS_SUCCESS:
            return {
                ...state,
                loadingNew: false,
                newUsers: action.payload,
            }
        case actions.GET_NEW_USERS_FAILURE:
            return {
                ...state,
                loadingNew: false,
                errorNew: action.payload
            }
        default:
            return state;
    }
}