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
            // console.log(action.payload)
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
        case actions.GET_POSTS_START:
            return {
                ...state,
                loadingPosts: true
            }
        case actions.GET_POSTS_SUCCESS:
            const posts = state.posts;
            action.payload.forEach(item => posts.push(item))
            // console.log(posts);
            return {
                ...state,
                loadingPosts: false,
                posts: posts
            }
        case actions.GET_POSTS_FAILURE:
            return {
                ...state,
                loadingPosts: false,
                errorPosts: action.payload
            }
        case actions.CLEAR_USER:
            return {
                ...state,
                posts: [],
                topUsers: [],
                newUsers: [],
                errorTop: null,
                errorNew: null,
                errorPosts: null,
            }
        default:
            return state;
    }
}