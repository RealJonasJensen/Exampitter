import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import "./Dashboard.css";

import DashboardInfo from "./DashboardInfo/DashboardInfo";
import Posts from "../Posts/Posts";

class Dashboard extends Component {

    state = {
        message: "",
    }

    // On Mount. Get Top and New Users. If you are unauthenticated and the user is not set.

    componentWillMount() {
        if (this.props.auth.isAuthenticated && this.props.user !== {}) {
            this.props.onGetCurrentUser();
        }
        this.props.onGetTopUsers();
        this.props.onGetNewUsers();
    }

    // componentWillReceiveProps() {
    //     if (this.props.user.following.length > 0) {
    //         this.props.onGetPosts(this.props.user.following)
    //     }
    // }

    componentWillUpdate(nextProps) {
        console.log(nextProps)
        if (this.props.user.following !== nextProps.user.following) {
            console.log(nextProps.user.following)
            nextProps.user.following.forEach(user => {
                this.props.onGetPosts(user.user)
                console.log(user.user)
            });
        }
    }



    componentDidUpdate() {
        console.log("HEJ")
    }

    changeInputHandler = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = { text: this.state.message, avatar: this.props.user.avatar };
        this.props.onCreatePost(data);
    }

    render() {

        let dashboard = "Dashboard"

        if (this.props.auth) {
            dashboard = "Logged in"
        }

        let topUsers = "Loading Top Users..."
        if (!this.props.news.loadingTop) {
            topUsers = <DashboardInfo info={this.props.news.topUsers}>{"Followers"}</DashboardInfo>
        }

        let posts = "Loading Posts..."
        if (!this.props.news.loadingPosts) {
            posts = <Posts posts={this.props.news.posts} />
        }

        let newUsers = "Loading New Users";
        if (!this.props.news.loadingNew) {
            newUsers = <DashboardInfo info={this.props.news.newUsers}>{"Created"}</DashboardInfo>
        }

        return (
            <div className="dashboard">
                <div className="dashboard-item dash-item1">
                    Top Users
                    {topUsers}
                </div>
                <div className="dashboard-item dash-item2">
                    Feed
                    <div className="dashboard-item-input">
                        <form onSubmit={this.submitHandler} >
                            <input type="text" name="message" value={this.state.message} onChange={this.changeInputHandler} placeholder="What do you want to share?" />
                            <button type="submit">Post </button>
                        </form >
                    </div>
                    {posts}
                </div>
                <div className="dashboard-item dash-item3">
                    New Users
                    {newUsers}
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
        news: state.news,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentUser: () => dispatch(actions.getCurrentUser()),
        onGetTopUsers: () => dispatch(actions.getTopUsers()),
        onGetNewUsers: () => dispatch(actions.getNewUsers()),
        onGetPosts: (user) => dispatch(actions.getPosts(user)),
        onCreatePost: (data) => dispatch(actions.createPost(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);