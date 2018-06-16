import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Posts from "../../Components/Posts/Posts";
import DashboardInfo from "../../Components/Dashboard/DashboardInfo/DashboardInfo";

import "./User.css";

class User extends Component {

    componentDidMount() {
        this.props.onGetUserPage(this.props.match.params.id)
        this.props.onGetUserPagePosts(this.props.match.params.id)
    }

    // componentWillUpdate() {

    //     this.props.onGetUserPage(this.props.match.params.id)
    //     this.props.onGetUserPagePosts(this.props.match.params.id)
    // }

    render() {

        let following = null;
        if (this.props.page.user.following) {
            following = <DashboardInfo info={this.props.page.user.following} >{"Following"}</DashboardInfo>
        }

        let followers = null;
        if (this.props.page.user.followers) {
            followers = <DashboardInfo info={this.props.page.user.followers} >{"Follower"}</DashboardInfo>
        }

        console.log(this.props.page.user.following)


        return (
            <div className="user">
                <h2>{this.props.page.user.username}</h2>
                <div className="user-content">
                    <div>Following
                        {following}
                    </div>
                    <div><Posts posts={this.props.page.posts} />
                    </div>
                    <div>Followers
                        {followers}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserPage: (id) => dispatch(actions.getUserPage(id)),
        onGetUserPagePosts: (id) => dispatch(actions.getUserPagePosts(id)),
    }
}

const mapStateToProps = state => {
    return {
        page: state.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);