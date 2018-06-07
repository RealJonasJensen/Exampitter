import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Toolbar.css"

class Toolbar extends Component {

    render() {


        return (
            <div className="toolbar" >
                <div className="toolbar-items">
                    <div>Exampitter</div>
                    <div>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, null)(Toolbar);