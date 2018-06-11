import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import "./Dashboard.css";

import DashboardInfo from "./DashboardInfo/DashboardInfo";
import Posts from "./Posts/Posts";

class Dashboard extends Component {

    state = {
        message: "",
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated && this.props.user !== {}) {
            this.props.onGetCurrentUser();
        }
        this.props.onGetTopUsers();
        this.props.onGetNewUsers();
        console.log(this.props.post)
    }

    changeInputHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        let dashboard = "Dashboard"

        if (this.props.auth) {
            dashboard = "Logged in"
        }

        return (
            <div className="dashboard">
                <div className="dashboard-item dash-item1">
                    Top Users
                    <DashboardInfo info={this.props.post.topUsers}>{"Followers"}</DashboardInfo>
                </div>
                <div className="dashboard-item dash-item2">
                    Feed
                    <div className="dashboard-item-input">
                        <form action="">
                            <input type="text" name="message" value={this.state.message} onChange={this.changeInputHandler} placeholder="What do you want to share?" />
                            <button>Post </button>
                        </form>
                    </div>
                    <Posts />
                </div>
                <div className="dashboard-item dash-item3">
                    New Users
                <DashboardInfo info={this.props.post.newUsers}>{"Created"}</DashboardInfo>
                </div>
                {dashboard}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        user: state.user,
        post: state.post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentUser: () => dispatch(actions.getCurrentUser()),
        onGetTopUsers: () => dispatch(actions.getTopUsers()),
        onGetNewUsers: () => dispatch(actions.getNewUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);