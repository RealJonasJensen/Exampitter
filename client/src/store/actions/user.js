import * as actions from "./actionTypes";
import axios from "axios";

export const getCurrentUser = () => dispatch => {
    axios.get("/api/users/current")
        .then(response => {
            dispatch(getCurrentUserSuccess(response.data))
        })
        .catch(err => dispatch(getCurrentUserFailure(err)))
}

export const getCurrentUserSuccess = (userdata) => {
    return {
        type: actions.GET_CURRENT_USER_SUCCESS,
        payload: userdata
    }
}

export const getCurrentUserFailure = error => {
    return {
        type: actions.GET_CURRENT_USER_FAILURE,
        payload: error
    }
}

