import * as actions from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../utility/setAuthToken";
import jwt_decode from "jwt-decode";

// Login User and get a Token

export const loginUser = (userdata, history) => (
    dispatch => {
        dispatch(loginStart())
        axios.post("https://exampitter-db.herokuapp.com/api/users/login", userdata)
            .then(response => {
                // console.log(response.data)
                // Save webtoken to localStorage
                const token = response.data.token;
                localStorage.setItem("jwt", token);
                // Set token to Auth Header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                dispatch(loginEnd())
                dispatch(setCurrentUser(decoded))
                history.push("/")
            })
            .catch(err => {
                // console.log(err.response.data)
                dispatch(loginEnd())
                dispatch(loginUserFailure(err.response.data))
            })
    }
)

export const loginStart = () => {
    return {
        type: actions.LOGIN_START
    }
}

export const loginEnd = () => {
    return {
        type: actions.LOGIN_END
    }
}

export const loginUserFailure = (error) => {
    return {
        type: actions.LOGIN_USER_FAILURE,
        payload: error
    }
}

export const setCurrentUser = (decoded) => (
    {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    }
)

export const logoutUser = () => dispatch => {
    // console.log("hej")
    localStorage.removeItem("jwt")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    dispatch({
        type: actions.CLEAR_USER,
    })
}

// Register User

export const registerUser = (userdata, history) => dispatch => {
    // console.log(userdata)
    dispatch(registerStart())
    axios.post("https://exampitter-db.herokuapp.com/api/users/register", userdata)
        .then(response => {
            // console.log(response.data)
            dispatch(registerUserSuccess(response.data))
            dispatch(loginUser(userdata, history))
        })
        .catch(err => {
            // console.log(err)
            dispatch(registerUserFailure(err.response.data))
        })
}

export const registerStart = () => {
    return {
        type: actions.REGISTER_USER_START,
    }
}

export const registerUserSuccess = (data) => {
    return {
        type: actions.REGISTER_USER_SUCCESS,
        payload: data
    }
}

export const registerUserFailure = (error) => {
    return {
        type: actions.REGISTER_USER_FAILURE,
        payload: error
    }
}