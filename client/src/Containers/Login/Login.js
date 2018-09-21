import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
        return (
            <div className="login">
                <form>
                    <input type="text" name="email" placeholder="Email" onChange={this.onChangeInputHandler} value={this.state.email} />
                    {this.props.auth.error.loginEmail}
                    <input type="password" name="password" placeholder="Password" onChange={this.onChangeInputHandler} value={this.state.password} />
                    {this.props.auth.error.loginPassword}
                    <button onClick={this.onSubmitHandler}>Login</button>
                </form>
            </div>
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