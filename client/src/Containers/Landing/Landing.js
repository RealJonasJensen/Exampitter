import React, { Component } from "react";

import "./Landing.css";

import Register from "../../Components/Register/Register";


class Landing extends Component {

    onClickHandler = (page) => {
        this.props.history.push("/" + page)
    }


    render() {

        return (
            <div className="landing">
                <div className="landing-info">
                    <div className="landing-register">
                        <Register />
                    </div>
                    <div className="landing-tour">
                        <h2>Welcome to Exampitter!</h2>
                        <h3>Share your thoughts with the world!</h3>
                        <div className="landing-tour-btn" onClick={() => { this.onClickHandler("dashboard") }}>Take a tour</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
