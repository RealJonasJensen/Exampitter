import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Toolbar.css"

import Login from "../../Containers/Login/Login";

class Toolbar extends Component {

    render() {


        let items = (
            <Login />
        )

        if (this.props.auth.isAuthenticated) {
            items = (
                <div className="toolbar-links">
                    <NavLink to={"/user/" + this.props.auth.user.id}>{this.props.auth.user.username}</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            )
        }


        return (
            <div className="toolbar" >
                <div className="toolbar-items">
                    <div><NavLink to="/"><h1>Exampitter</h1></NavLink></div>
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