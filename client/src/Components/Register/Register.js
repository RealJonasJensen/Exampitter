import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import "./Register.css";

class Register extends Component {

    state = {
        email: "",
        username: "",
        password: "",
        password2: ""
    }

    onChangeInputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const info = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.onRegisterUser(info, this.props.history)
    }

    render() {
        return (
            <div className="register">
                <h2>Create a profile!</h2>
                <form>
                    <input required type="text" name="email" onChange={this.onChangeInputHandler} value={this.state.email} placeholder="Email" />
                    <p className="register-error" >{this.props.auth.error.email}</p>
                    <input required type="text" name="username" onChange={this.onChangeInputHandler} value={this.state.username} placeholder="Username" />
                    <p className="register-error" >{this.props.auth.error.username}</p>
                    <input required type="password" name="password" onChange={this.onChangeInputHandler} value={this.state.password} placeholder="Password" />
                    <p className="register-error" >{this.props.auth.error.password}</p>
                    <input required type="password" name="password2" onChange={this.onChangeInputHandler} value={this.state.password2} placeholder="Repeat Password" />
                    <p className="register-error" >{this.props.auth.error.password2}</p>
                    <button onClick={this.onSubmitHandler}>Register</button>
                    <p className="register-info" >There is no email confirmation so use a test email</p>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisterUser: (info, history) => dispatch(actions.registerUser(info, history))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);