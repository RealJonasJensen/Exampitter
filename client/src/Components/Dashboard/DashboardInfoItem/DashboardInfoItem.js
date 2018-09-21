import React, { Component } from "react";

import { NavLink, withRouter } from "react-router-dom"

import Aux from "../../../Hoc/Aux/Aux";


import "./DashboardInfoItem.css";

class DashboardInfoItem extends Component {


    render() {

        let info = <p>{this.props.children}</p>;
        if (this.props.match.path === "/") {
            if (this.props.children.split(" ")[0] === "Created") {
                const data = this.props.children.split(" ")
                info = (<Aux><p>{data[0]} {data[1]}</p> <p>{data[2]}</p></Aux>)
            }
        }



        return (
            <NavLink to={"/user/" + this.props.id} className="dashboard-info-link" >
                <div className="dashboard-info-item">
                    <div className="dashboard-info-item-img" >
                        <img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt={this.props.username} />
                    </div>
                    <div className="dashboard-info-item-text">
                        <p>{this.props.username}</p>
                        {info}
                    </div>
                </div>
            </NavLink>
        )
    }
}




export default withRouter(DashboardInfoItem);