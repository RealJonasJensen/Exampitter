import * as actions from "./actionTypes";
import axios from "axios";

// Get top users in the feed

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

// Get new users in the feed

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

// Get Posts From Following

export const getPosts = user => dispatch => {
    dispatch(getPostsStart());
    //console.log(following)
    let posts = [];
    //console.log(user)
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

// Create Post

export const createPost = data => dispatch => {
    axios.post("/api/posts/", data)
        .then(response => dispatch(createPostSuccess(response.data)))
        .catch(error => {
            dispatch(createPostError(error.response.data))
            setTimeout(() => { dispatch(clearError()) }, 5000)
        })
}

export const createPostSuccess = data => {
    return {
        type: actions.CREATE_POST_SUCCESS,
        payload: data
    }
}

export const createPostError = error => {
    return {
        type: actions.CREATE_POST_FAILURE,
        payload: error
    }
}

// Like Post

export const likePost = (postId) => dispatch => {
    axios.post("/api/posts/like/" + postId)
        .then(response => {
            dispatch(likePostSuccess(response.data))
            dispatch(likePostPageSuccess(response.data))
        }
        )
        .catch(err => {
            dispatch(likePostFailure(err.response))
            dispatch(likePostPageFailure(err.response))
        }
        )
}

export const likePostSuccess = data => {
    return {
        type: actions.DASHBOARD_LIKE_POST_SUCCESS,
        payload: data
    }
}

export const likePostFailure = err => {
    return {
        type: actions.DASHBOARD_LIKE_POST_FAILURE,
        payload: err
    }
}

export const likePostPageSuccess = data => {
    return {
        type: actions.PAGE_LIKE_POST_SUCCESS,
        payload: data
    }
}

export const likePostPageFailure = err => {
    return {
        type: actions.PAGE_LIKE_POST_FAILURE,
        payload: err
    }
}



// Unlike Post

export const unLikePost = (postId, userId) => dispatch => {
    axios.post("/api/posts/unlike/" + postId)
        .then(response => {
            dispatch(unLikePostSuccess(response.data, userId))
            dispatch(unLikePostPageSuccess(response.data))

        })
        .catch(err => {
            dispatch(unLikePostFailure(err.response))
            console.log(err)
        }
        )
}

export const unLikePostSuccess = (data, userId) => {
    return {
        type: actions.DASHBOARD_UNLIKE_POST_SUCCESS,
        payload: { data, userId }
    }
}

export const unLikePostFailure = err => {
    return {
        type: actions.DASHBOARD_UNLIKE_POST_FAILURE,
        payload: err
    }
}

export const unLikePostPageSuccess = data => {
    return {
        type: actions.PAGE_UNLIKE_POST_SUCCESS,
        payload: data
    }
}

// Create Comment

export const createCommentDashboard = (postId, comment) => dispatch => {
    const data = { text: comment };
    axios.post("/api/posts/" + postId + "/comment", data)
        .then(response => {
            console.log(response.data)
            dispatch(createCommentSuccess(response.data))
        })
        .catch(err => {
            dispatch(createCommentFailure(err.response.data))
            setTimeout(() => { dispatch(clearCommentError()) }, 5000)
        })
}

export const createCommentSuccess = data => {
    return {
        type: actions.DASHBOARD_CREATE_COMMENT_SUCCESS,
        payload: data
    }
}

export const createCommentFailure = error => {
    return {
        type: actions.DASHBOARD_CREATE_COMMENT_FAILURE,
        payload: error
    }
}

// Delete Post

export const deletePost = id => dispatch => {
    axios.delete("/api/posts/" + id)
        .then(response => {
            dispatch(deletePostDashboardSuccess(response.data, id))
            dispatch(deletePostPageSuccess(response.data, id))
        })
        .catch(err => dispatch(deletePostDashboardFailure(err.response)))
}

export const deletePostDashboardSuccess = (data, id) => {
    return {
        type: actions.DASHBOARD_DELETE_POST_SUCCESS,
        payload: { data, id }
    }
}

export const deletePostDashboardFailure = error => {
    return {
        type: actions.DASHBOARD_DELETE_POST_FAILURE,
        payload: error
    }
}

export const deletePostPageSuccess = (data, id) => {
    return {
        type: actions.PAGE_DELETE_POST_SUCCESS,
        payload: { data, id }
    }
}

// Delete Comment

export const deleteComment = (postId, commentId, path) => dispatch => {
    console.log(postId, commentId)
    axios.delete(`/api/posts/${postId}/comment/${commentId}`)
        .then(response => {
            console.log(response.data)
            dispatch(deleteCommentSuccess(response.data, commentId, path))
        })
        .catch(error => {
            console.log(error)
            dispatch(deleteCommentFailure(error))
        })
}

export const deleteCommentSuccess = (data, commentId, path) => {
    console.log(path)
    if (path === "/") {
        return {
            type: actions.DASHBOARD_DELETE_COMMENT_SUCCESS,
            payload: { data, commentId }
        }
    } else {
        return {
            type: actions.PAGE_DELETE_COMMENT_SUCCESS,
            payload: { data, commentId }
        }
    }

}
export const deleteCommentFailure = error => {
    return {
        type: actions.DASHBOARD_DELETE_COMMENT_FAILURE,
        payload: error
    }
}

// Clear User

export const clearPosts = () => {
    return {
        type: actions.CLEAR_USER,
    }
}

// Clear Errors

export const clearError = () => {
    return {
        type: actions.CLEAR_ERROR
    }
}

export const clearCommentError = () => {
    return {
        type: actions.CLEAR_COMMENT_ERROR
    }
}

