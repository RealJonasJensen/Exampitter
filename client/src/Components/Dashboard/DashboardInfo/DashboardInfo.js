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
        } else if (props.children === "Following") {
            //console.log(item)
            return <DashboardInfoItem key={i} avatar={item.user.avatar} username={item.user.username} />
        } else if (props.children === "Follower") {
            return <DashboardInfoItem key={i} avatar={item.user.avatar} username={item.user.username} />
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