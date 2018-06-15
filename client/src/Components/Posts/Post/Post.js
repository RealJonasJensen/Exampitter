import React, { Component } from "react";

import { withRouter } from "react-router-dom"

import { connect } from "react-redux";

import PostComment from "../PostComment/PostComment";
import Aux from "../../../Hoc/Aux/Aux";

import * as actions from "../../../store/actions/index";

import "./Post.css";

class Post extends Component {

    state = {
        showComments: false,
        comment: "",
    }

    changePostHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onLikeClick = (id) => {
        this.props.clicked(id);
        console.log(this.props.history)
    }

    onToggleComments = () => {
        this.setState((prevState) => {
            return { showComments: !prevState.showComments }
        })
    }

    submitComment = (event) => {
        event.preventDefault();
        this.props.onSubmitComment(this.props.id, this.state.comment);
    }



    render() {

        let comments = "loading..."
        if (this.props.comments) {
            comments = this.props.comments.map(comment => (
                <PostComment key={comment._id} {...comment} />
            ))

        }

        console.log(this.props.user)
        return (
            <Aux>
                <div className="post" >
                    <div className="post-avatar"><img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt="" /></div>
                    <div>
                        <p>{this.props.username}</p>
                        <p>{this.props.text}</p>
                        <p>{this.props.likes === 1 ? this.props.likes + " Like" : this.props.likes + " Likes"}</p>
                        <p className="post-like" onClick={() => this.onLikeClick(this.props.id)} >{this.props.status}</p>
                        <p onClick={this.onToggleComments} >Show Comments</p>
                        <p onClick={() => this.props.onDeletePost(this.props.id)} >Delete Post</p>

                    </div>
                </div>
                <div className="post-comments">
                    <div className="post-create-comment">
                        <form onSubmit={this.submitComment} >
                            <input type="text" onChange={this.changePostHandler} className="post-input" placeholder="Write Comment" name="comment" value={this.state.comment} />
                        </form>
                    </div>
                    {this.state.showComments ? comments : null}
                </div>
            </Aux >
        )
    }
}

const mapDisaptchToProps = dispatch => {
    return {
        onSubmitComment: (id, comment) => dispatch(actions.createComment(id, comment)),
        onDeletePost: (id) => dispatch(actions.deletePost(id)),
        onGetPosts: (user) => dispatch(actions.getPosts(user)),
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default withRouter(connect(mapStateToProps, mapDisaptchToProps)(Post));