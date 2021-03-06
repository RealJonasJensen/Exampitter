import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Aux from "../../Hoc/Aux/Aux";
import AuthSpinner from "../UI/AuthSpinner/AuthSpinner";

import "./Login.css";

import * as actions from "../../store/actions/index";

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    onChangeInputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const info = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.onLoginUser(info, this.props.history)
    }


    render() {
        // console.log(this.props.auth.error.response)

        let loading = null;
        let button = null;
        if (this.props.auth.loadingLogin) {
            loading = <AuthSpinner />
        } else {
            button = <button onClick={this.onSubmitHandler}>Login</button>
        }

        return (
            <Aux>
                <div className="login-loader" >
                    {loading}
                </div>
                < div className="login" >
                    <form>
                        <input type="text" name="email" placeholder="Email" onChange={this.onChangeInputHandler} value={this.state.email} />
                        <input type="password" name="password" placeholder="Password" onChange={this.onChangeInputHandler} value={this.state.password} />
                        {button}
                    </form>
                    <div className="login-error">
                        <p>
                            {this.props.auth.error.loginEmail}
                        </p>
                        <p>
                            {this.props.auth.error.loginPassword}
                        </p>
                    </div>
                </div >
            </Aux>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (info, history) => dispatch(actions.loginUser(info, history))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));