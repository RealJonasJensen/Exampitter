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
                    <input type="text" name="email" onChange={this.onChangeInputHandler} value={this.state.email} placeholder="Email" />
                    <input type="text" name="username" onChange={this.onChangeInputHandler} value={this.state.username} placeholder="Username" />
                    <input type="password" name="password" onChange={this.onChangeInputHandler} value={this.state.password} placeholder="Password" />
                    <input type="password" name="password2" onChange={this.onChangeInputHandler} value={this.state.password2} placeholder="Repeat Password" />
                    <button onClick={this.onSubmitHandler}>Register</button>
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

export default connect(null, mapDispatchToProps)(Register);