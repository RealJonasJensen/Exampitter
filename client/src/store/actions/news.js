import * as actions from "./actionTypes";
import axios from "axios";

export const getTopUsers = () => dispatch => {
    dispatch(getTopUsersStart())
    axios.get("/api/users/top")
        .then(response => {
            dispatch(getTopUsersSuccess(response.data))
        })
        .catch(err => {
            dispatch(getTopUsersFailure(err))
        })
}

export const getTopUsersStart = () => {
    return {
        type: actions.GET_TOP_USERS_START,
    }
}

export const getTopUsersSuccess = data => {
    return {
        type: actions.GET_TOP_USERS_SUCCESS,
        payload: data
    }
}

export const getTopUsersFailure = error => {
    return {
        type: actions.GET_TOP_USERS_FAILURE,
        payload: error
    }
}


export const getNewUsers = () => dispatch => {
    dispatch(getNewUsersStart())
    axios.get("/api/users/newest")
        .then(response => dispatch(getNewUsersSuccess(response.data)))
        .catch(error => dispatch(getNewUsersFailure(error)))
}

export const getNewUsersStart = () => {
    return {
        type: actions.GET_NEW_USERS_START
    }
}

export const getNewUsersSuccess = data => {
    return {
        type: actions.GET_NEW_USERS_SUCCESS,
        payload: data,
    }
}

export const getNewUsersFailure = error => {
    return {
        type: actions.GET_NEW_USERS_FAILURE,
        payload: error
    }
}

export const getPosts = user => dispatch => {
    dispatch(getPostsStart());
    //console.log(following)
    let posts = [];
    console.log(user)
    axios.get("api/posts/user/" + user)
        .then(response => {
            response.data.forEach(message => {
                posts.push(message)
            })
            dispatch(getPostsSuccess(posts))
        })
        .catch(err => dispatch(getPostsFailure(err.response)))

}

export const getPostsStart = () => {
    return {
        type: actions.GET_POSTS_START,
    }
}

export const getPostsFailure = error => {

    return {
        type: actions.GET_POSTS_FAILURE,
        payload: error
    }
}

export const getPostsSuccess = data => {
    return {
        type: actions.GET_POSTS_SUCCESS,
        payload: data

    }
}

export const createPost = data => dispatch => {
    axios.post("/api/posts/", data)
        .then(response => dispatch(getPosts()))
        .catch(error => dispatch(createPostError(error.response)))
}

export const createPostSuccess = data => {

}

export const createPostError = error => {
    return {
        type: actions.CREATE_POST_FAILURE,
        payload: error
    }
}

export const likePost = (postId) => dispatch => {
    axios.post("/api/posts/like/" + postId)
        .then(response => console.log(response.data))
        .catch(err => dispatch(likePostFailure(err.response)))
}

export const likePostFailure = err => {
    return {
        type: actions.LIKE_POST_FAILURE,
        payload: err
    }
}

export const unLikePost = (postId) => dispatch => {
    axios.post("/api/posts/unlike/" + postId)
        .then(response => console.log(response.data))
        .catch(err => dispatch(unLikePostFailure(err.response)))
}

export const unLikePostFailure = err => {
    return {
        type: actions.UNLIKE_POST_FAILURE,
        payload: err
    }
}