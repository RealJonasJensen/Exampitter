import * as actions from "./actionTypes";
import axios from "axios";

// Get the user page

export const getUserPage = id => dispatch => {
    dispatch(getUserPageStart())
    axios.get("/api/users/user/" + id)
        .then(response => dispatch(getUserPageSuccess(response.data)))
        .catch(err => dispatch(getUserPageFailure(err.response)))
}

export const getUserPageStart = () => {
    return {
        type: actions.GET_USER_PAGE_START
    }
}

export const getUserPageSuccess = data => {
    return {
        type: actions.GET_USER_PAGE_SUCCESS,
        payload: data
    }
}

export const getUserPageFailure = error => {
    return {
        type: actions.GET_USER_PAGE_FAILURE,
        payload: error
    }
}

// Get posts on user page

export const getUserPagePosts = id => dispatch => {
    dispatch(getUserPagePostsStart())
    axios.get("/api/posts/user/" + id)
        .then(response => {
            dispatch(getUserPagePostsSuccess(response.data))
            //dispatch(clearNews())
        })
        .catch(err => dispatch(getUserPagePostsFailure(err.response)))
}

export const getUserPagePostsStart = () => {
    return {
        type: actions.GET_USER_PAGE_POSTS_START
    }
}

export const getUserPagePostsSuccess = data => {
    return {
        type: actions.GET_USER_PAGE_POSTS_SUCCESS,
        payload: data
    }
}

export const getUserPagePostsFailure = error => {
    return {
        type: actions.GET_USER_PAGE_POSTS_FAILURE,
        payload: error
    }
}

// Crate a comment

export const createCommentPage = (postId, comment) => dispatch => {
    const data = { text: comment };
    axios.post("/api/posts/" + postId + "/comment", data)
        .then(response => dispatch(createCommentSuccess(response.data)))
        .catch(err => dispatch(createCommentFailure(err.data)))
}

export const createCommentSuccess = data => {
    return {
        type: actions.PAGE_CREATE_COMMENT_SUCCESS,
        payload: data
    }
}

export const createCommentFailure = error => {
    return {
        type: actions.PAGE_CREATE_COMMENT_FAILURE,
        payload: error
    }
}

// Follow a user

export const followUser = (userId) => dispatch => {
    axios.post("/api/users/" + userId + "/follow")
        .then(response => dispatch(followUserSuccess(response.data)))
        .catch(error => dispatch(followUserFailure(error.response)))

}

export const followUserSuccess = data => {
    return {
        type: actions.FOLLOW_USER_SUCCESS,
        payload: data
    }
}

export const followUserFailure = error => {
    return {
        type: actions.FOLLOW_USER_FAILURE,
        payload: error
    }
}

// Unfollow a user

export const unfollowUser = (userId) => dispatch => {
    axios.post("/api/users/" + userId + "/unfollow")
        .then(response => dispatch(unfollowUserSuccess(response.data)))
        .catch(error => dispatch(unfollowUserFailure(error.response)))

}

export const unfollowUserSuccess = data => {
    return {
        type: actions.UNFOLLOW_USER_SUCCESS,
        payload: data
    }
}

export const unfollowUserFailure = error => {
    return {
        type: actions.UNFOLLOW_USER_FAILURE,
        payload: error
    }
}


