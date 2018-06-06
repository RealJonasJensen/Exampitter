import React, { Component } from "react";

import "./Landing.css";


class Landing extends Component {

    onClickHandler = (page) => {
        this.props.history.push("/" + page)
    }


    render() {

        return (
            <div className="landing">
                <div className="landing-info">
                    <div onClick={() => { this.onClickHandler("login") }}>Login</div>
                    <div onClick={() => { this.onClickHandler("register") }} >Register</div>
                    <div onClick={() => { this.onClickHandler("dashboard") }} className="item3">Take a tour</div>
                </div>
            </div>
        )
    }
}

export default Landing;
