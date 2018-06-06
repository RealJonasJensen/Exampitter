import React from "react";
import { NavLink } from "react-router-dom";

import "./Toolbar.css"

const Toolbar = props => {

    return (
        <div className="toolbar">
            <div className="toolbar-items">
                <div>Exampitter</div>
                <div>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Toolbar;