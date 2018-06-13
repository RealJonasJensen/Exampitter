import * as actions from "../actions/actionTypes";

const initialState = {
    user: {},
    posts: [],
    loadingUser: false,
    loadingPosts: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_USER_PAGE_START:
            return {
                ...state,
                loadingUser: true
            }
        case actions.GET_USER_PAGE_FAILURE:
            return {
                ...state,
                loadingUser: false,
                error: action.payload
            }
        case actions.GET_USER_PAGE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loadingUser: false,
                user: action.payload
            }
        case actions.GET_USER_PAGE_POSTS_START:
            return {
                ...state,
                loadingPosts: true
            }
        case actions.GET_USER_PAGE_POSTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loadingPosts: false,
                posts: action.payload
            }
        case actions.GET_USER_PAGE_POSTS_FAILURE:
            return {
                ...state,
                loadingPosts: false,
                error: action.payload
            }
        default:
            return state;
    }
}