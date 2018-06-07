import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import "./Dashboard.css";

class Dashboard extends Component {

    state = {
        message: "",
        posts: [],
        topUsers: [],
        newUsers: [],
        loadingTop: false,
        loadingPosts: false,
        loadingNew: false,
    }

    componentDidMount() {
        console.log(this.props.auth)
    }

    changeInputHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        if (this.props.auth && this.props.user === {}) {
            this.props.onGetCurrentUserInit();
        }

        let dashboard = "Dashboard"

        if (this.props.auth) {
            dashboard = "Logged in"
        }

        return (
            <div className="dashboard">
                <div className="dashboard-item dash-item1">Top Users</div>
                <div className="dashboard-item dash-item2">
                    Feed
                    <div className="dashboard-item-input">
                        <form action="">
                            <input type="text" name="message" value={this.state.message} onChange={this.changeInputHandler} placeholder="What do you want to share?" />
                            <button>Post </button>
                        </form>
                    </div>
                </div>
                <div className="dashboard-item dash-item3">New Users</div>
                {dashboard}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentUserInit: () => dispatch(actions.getCurrentUserInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);