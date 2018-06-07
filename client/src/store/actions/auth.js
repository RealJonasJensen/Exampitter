import * as actions from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../utility/setAuthToken";
import jwt_decode from "jwt-decode";

// Login User and get a Token

export const loginUser = (userdata, history) => (
    dispatch => {
        axios.post("/api/users/login", userdata)
            .then(response => {
                console.log(response.data)
                // Save webtoken to localStorage
                const token = response.data.token;
                localStorage.setItem("jwt", token);
                // Set token to Auth Header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded))
                history.push("/")
            })
            .catch(err => {
                dispatch({
                    type: actions.GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
)

export const setCurrentUser = (decoded) => (
    {
        type: actions.SET_CURRENT_USER,
        payload: decoded
    }
)

export const logoutUser = () => dispatch => {
    console.log("hej")
    localStorage.removeItem("jwt")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

export const registerUser = (userdata, history) => dispatch => {
    console.log(userdata)
    axios.post("api/users/register", userdata)
        .then(response => {
            console.log(response.data)
            history.push("/login")
        })
        .catch(err => {
            dispatch({
                type: actions.GET_ERRORS,
                payload: err.response.data
            })
        })
}