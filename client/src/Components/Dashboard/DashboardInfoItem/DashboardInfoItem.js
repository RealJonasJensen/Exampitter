import React from "react";

import { NavLink } from "react-router-dom"
// import path from "../../Images/";

import "./DashboardInfoItem.css";

const DashboardInfoItem = (props) => {

    return (
        <NavLink to={"/user/" + props.id}>
            <div className="dashboard-info-item">
                <div><img src={process.env.PUBLIC_URL + "/Images/" + props.avatar} alt={props.username} /></div>
                <div className="dashboard-info-item-text">
                    <p>{props.username}</p>
                    <p>{props.info} {props.children}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default DashboardInfoItem;