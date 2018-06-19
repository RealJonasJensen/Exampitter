import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Posts from "../../Components/Posts/Posts";
import DashboardInfo from "../../Components/Dashboard/DashboardInfo/DashboardInfo";

import "./User.css";

class User extends Component {

    componentDidMount() {
        this.props.onGetUserPage(this.props.match.params.id);
        this.props.onGetUserPagePosts(this.props.match.params.id);
        this.props.onClearPosts();
        if (this.props.auth.isAuthenticated && this.props.user !== {}) {
            this.props.onGetCurrentUser();
        }
    }

    // componentWillReceiveProps() {

    //     this.props.onGetUserPage(this.props.match.params.id)
    //     this.props.onGetUserPagePosts(this.props.match.params.id)
    // }

    componentDidUpdate(prevProps) {
        // console.log("UPDATE")
        // console.log(prevProps)
        // console.log(this.props.match)

        // console.log("PrevUser: " + prevProps.match.url + " NEW USER: " + this.props.match.url)

        if (prevProps.match.url !== this.props.match.url) {
            // console.log("NEW USER")
            this.props.onGetUserPage(this.props.match.params.id)
            this.props.onGetUserPagePosts(this.props.match.params.id)
        }

    }

    render() {

        let following = "Loading Following...";
        if (this.props.page.user.following) {
            following = <DashboardInfo info={this.props.page.user.following} >{"Following"}</DashboardInfo>
        }

        let posts = "Loading Posts..."
        if (!this.props.news.loadingPosts && this.props.page.posts.length !== 0) {
            posts = <Posts posts={this.props.page.posts} />
        } else {
            posts = <p>This user has no posts yet!</p>
        }

        let followers = "Loading Followers...";
        if (this.props.page.user.followers) {
            followers = <DashboardInfo info={this.props.page.user.followers} >{"Follower"}</DashboardInfo>
        }

        let button = "loading button";

        console.log(this.props.user.id, this.props.match.params.id)

        if (this.props.page.user.followers) {
            const isUserFollowing = this.props.page.user.followers.filter(item => item.user._id === this.props.user.id)
            console.log(isUserFollowing)
            if (isUserFollowing.length >= 1) {
                button = (<div className="user-follow" onClick={() => this.props.onUnfollowUser(this.props.match.params.id)}>
                    <p>Unfollow</p>
                </div>)
            }
            if (isUserFollowing.length < 1) {
                button = (<div className="user-follow" onClick={() => this.props.onFollowUser(this.props.match.params.id)} >
                    <p> Follow </p>
                </div>)
            }
            if (this.props.user.id === this.props.match.params.id) {
                button = null;
            }
        }
        console.log(this.props.page.user.followers)


        return (
            <div className="user">
                {button}

                <h2 className="user-username">{this.props.page.user.username} </h2>
                <div className="user-content">
                    <div>Following
                        {following}
                    </div>
                    <div>
                        {posts}
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
        onFollowUser: (id) => dispatch(actions.followUser(id)),
        onUnfollowUser: (id) => dispatch(actions.unfollowUser(id)),
        onClearPosts: () => dispatch(actions.clearPosts()),
        onGetCurrentUser: () => dispatch(actions.getCurrentUser()),
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        page: state.page,
        news: state.news,
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);