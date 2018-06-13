import * as actions from "./actionTypes";
import axios from "axios";

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

export const getUserPagePosts = id => dispatch => {
    dispatch(getUserPagePostsStart())
    axios.get("/api/posts/user/" + id)
        .then(response => dispatch(getUserPagePostsSuccess(response.data)))
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