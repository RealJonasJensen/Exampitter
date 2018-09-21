import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Toolbar.css"

import Login from "../../Containers/Login/Login";

class Toolbar extends Component {

    render() {
        let items = <Login />

        if (this.props.auth.isAuthenticated) {
            items = (
                <ul className="toolbar-links">
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to={"/user/" + this.props.auth.user.id}><li>{this.props.auth.user.username}</li></NavLink>
                    <NavLink to="/logout"><li>Logout</li></NavLink>
                </ul>
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