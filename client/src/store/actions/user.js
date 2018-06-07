import * as actions from "./actionTypes";
import axios from "axios";

export const getCurrentUserInit = () => dispatch => {
    axios.get("/api/users/current")
        .then(response => {
            dispatch(getCurrentUserSuccess(response.data))
        })
        .catch(err => dispatch({
            type: actions.GET_ERRORS,
            payload: err.response.data
        }))
}

export const getCurrentUserSuccess = (userdata) => {
    return {
        type: actions.GET_CURRENT_USER_SUCCESS,
        payload: userdata
    }
}