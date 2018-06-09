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