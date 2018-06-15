import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Post from "./Post/Post";

import "./Posts.css";

class Posts extends Component {

    likeHandler = (id) => {
        //console.log(id);
        this.props.onLikePost(id);
        //this.props.onGetPosts(id)
    }

    unLikeHandler = (id) => {
        //console.log(id);
        this.props.onUnLikePost(id);
    }

    render() {


        const posts1 = this.props.posts.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        console.log(posts1)

        const posts = posts1.map((post, index) => {

            console.log(post.likes)
            console.log(this.props.user.id)

            const alreadyLiked = post.likes.filter(like => like.user.toString() === this.props.user.id);
            // console.log(alreadyLiked)
            console.log(alreadyLiked)

            let handler = null;
            let status = "";

            if (alreadyLiked.length > 0) {
                handler = this.unLikeHandler;
                status = "Unlike";
            } else {
                handler = this.likeHandler;
                status = "Like";
            }
            return (
                <Post key={post._id + index} status={status} clicked={handler} username={post.username}
                    avatar={post.avatar} text={post.text} likes={post.likes.length} id={post._id} comments={post.comments} />
            )


        })

        return (
            <div className="posts">
                {posts}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLikePost: (id) => dispatch(actions.likePost(id)),
        onUnLikePost: (id) => dispatch(actions.unLikePost(id)),
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);