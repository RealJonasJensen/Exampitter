import * as actions from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../utility/setAuthToken";
import jwt_decode from "jwt-decode";

// Login User and get a Token

export const loginUser = userdata => (
    dispatch => {
        axios.post("api/users/login", userdata)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }
)