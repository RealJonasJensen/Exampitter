import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Toolbar.css"

class Toolbar extends Component {

    render() {


        let items = (
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>

            </div>
        )

        if (this.props.auth.isAuthenticated) {
            items = (
                <div>
                    <NavLink to="/">{this.props.auth.user.username}</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            )
        }


        return (
            <div className="toolbar" >
                <div className="toolbar-items">
                    <div>Exampitter</div>
                    {items}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Toolbar);