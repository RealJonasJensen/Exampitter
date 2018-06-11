import React from "react";

import DashboardInfoItem from "../DashboardInfoItem/DashboardInfoItem";

import "./DashboardInfo.css";

const DashboardInfo = (props) => {

    const items = props.info.map((item, i) => {
        console.log(props.children)

        if (props.children === "Followers") {
            return <DashboardInfoItem key={i} avatar={item.avatar} username={item.username}>{item.followers.length + " Followers"}</DashboardInfoItem>
        } else if (props.children === "Created") {
            const date = item.dayMonthyear
            return <DashboardInfoItem key={i} avatar={item.avatar} username={item.username}>{"Created at: " + date}</DashboardInfoItem >
        }
        return null;
    }

    )

    return (
        <div className="DashboardInfo">
            {items}
        </div>
    )
}

export default DashboardInfo;