import React, { Component } from "react";

import "./Landing.css";

import Register from "../../Components/Register/Register";


class Landing extends Component {

    onClickHandler = (page) => {
        this.props.history.push("/" + page)
    }


    render() {

        return (
            <div className="landing-wrapper">
                <div className="landing">
                    <div className="landing-border" ></div>
                    <div className="landing-inner">
                        <div className="landing-info">
                            <div className="landing-info-text">
                                <h1 className="landing-h1" >Exampitter</h1>
                                <h3 className="landing-h3" >Share your ideas with the world!</h3>

                            </div>
                            <div className="landing-info-register" >
                                <Register />
                            </div>
                        </div>
                    </div>
                    <div className="landing-border" ></div>
                    <div className="landing-border-wrapper" >
                        <div className="landing-about">
                            <h1 className="landing-about-h1">About</h1>
                            <h3 className="landing-about-h3">This application was build with the MERN stack</h3>
                            <div className="landing-about-info">
                                <p>MongoDB</p>
                                <p>Express</p>
                                <p>React/Redux</p>
                                <p>Node</p>
                            </div>
                            <h4 className="landing-about-h4">Thanks to twitter for inspiration</h4>
                            <h4 className="landing-about-h4"> <a href="http://www.abkjaer.com" target="blank" >Made by Jonas Abkjær Jensen</a></h4>

                        </div>
                    </div>
                    <div className="landing-border" ></div>
                </div>
            </div>
        )
    }
}

export default Landing;
