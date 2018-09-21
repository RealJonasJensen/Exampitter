import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Posts from "../../Components/Posts/Posts";
import DashboardInfo from "../../Components/Dashboard/DashboardInfo/DashboardInfo";

import "./User.css";

class User extends Component {

    state = {
        status: "null"
    }

    componentDidMount() {
        this.props.onGetUserPage(this.props.match.params.id);
        this.props.onGetUserPagePosts(this.props.match.params.id);
        this.props.onClearPosts();
        if (this.props.auth.isAuthenticated && this.props.user !== {}) {
            this.props.onGetCurrentUser();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url !== this.props.match.url) {
            this.props.onGetUserPage(this.props.match.params.id)
            this.props.onGetUserPagePosts(this.props.match.params.id)
        }
    }

    onClickFollow = () => {
        this.props.onFollowUser(this.props.match.params.id, this.props.user)
    }

    onClickUnfollow = () => {
        this.props.onUnfollowUser(this.props.match.params.id, this.props.user)
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
            posts = <p className="user-nopost" >This user has no posts yet!</p>
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
                button = (<div className="user-follow" onClick={this.onClickUnfollow}>
                    <p className="user-p-unfollow">Unfollow</p>
                </div>)
            }
            if (isUserFollowing.length < 1) {
                button = (<div className="user-follow" onClick={this.onClickFollow} >
                    <p className="user-p-follow">Follow</p>
                </div>)
            }
            if (this.props.user.id === this.props.match.params.id) {
                button = null;
            }
        }

        const followersCount = this.props.page.user.followers ? this.props.page.user.followers.length : 0;
        const followingCount = this.props.page.user.following ? this.props.page.user.following.length : 0;
        const postCount = this.props.page.posts ? this.props.page.posts.length : 0;

        console.log(this.props.page.posts)


        return (
            <div className="user">
                <div className="user-info">
                    <div>
                        <div className="user-info-img">
                            <img src={process.env.PUBLIC_URL + "/Images/" + this.props.page.user.avatar} alt={this.props.username} />
                        </div>
                        <h2 className="user-username">{this.props.page.user.username} </h2>
                        <h4 className="user-quote">{this.props.page.user.quote} </h4>

                    </div>

                </div>
                <div className="user-info-data" >
                    <div>
                        <p>Posts</p><div className="count">{postCount}</div>
                    </div>
                    <div>
                        <p>Followers</p><div className="count">{followersCount}</div>
                    </div>
                    <div>
                        <p>Following</p><div className="count">{followingCount}</div>
                    </div>
                    {button}
                </div>
                <div className="user-content">
                    <div className="user-content-posts" >
                        {posts}
                    </div>
                    <div>
                        <div>
                            <h3 className="user-following-header" >
                                Following
                            </h3>
                            {following}
                        </div>
                        <div>
                            <h3 className="user-followers-header">
                                Followers
                            </h3>
                            {followers}
                        </div>
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
        onFollowUser: (id, currentUser) => dispatch(actions.followUser(id, currentUser)),
        onUnfollowUser: (id, currentUser) => dispatch(actions.unfollowUser(id, currentUser)),
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