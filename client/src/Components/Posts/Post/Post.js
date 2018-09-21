import React, { Component } from "react";

import { withRouter, NavLink } from "react-router-dom"

import { connect } from "react-redux";

import { FaTrash, FaHeart, FaComment } from 'react-icons/fa';

import PostComment from "../PostComment/PostComment";
import Modal from "../../UI/Modal/Modal";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../Hoc/Aux/Aux";

import * as actions from "../../../store/actions/index";

import "./Post.css";

class Post extends Component {

    state = {
        showComments: false,
        showModal: false,
        comment: "",
    }

    showModalHandler = () => {
        this.setState(prevState => {
            return { showModal: !prevState.showModal }
        })
    }

    changePostHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onLikeClick = (id) => {
        this.props.clicked(id);
        //console.log(this.props.history)
    }

    onToggleComments = () => {
        this.setState((prevState) => {
            return { showComments: !prevState.showComments }
        })
    }

    submitComment = (event) => {
        event.preventDefault();
        if (this.props.history.location.pathname === "/") {
            this.props.onSubmitCommentDashboard(this.props.id, this.state.comment);
        } else if (this.props.history.location.pathname.split("/")[1] === "user") {
            this.props.onSubmitCommentPage(this.props.id, this.state.comment)
        }
        this.setState({ comment: "" })
    }



    render() {

        let date = null
        if (this.props.date) {
            date = this.props.date.split("T")[0].split("-").reverse().join("-");
        }

        let comments = "loading..."
        if (this.props.comments) {
            comments = this.props.comments.map(comment => {
                console.log(comment)
                const commentUserId = comment.user._id ? comment.user._id : comment.user;
                return < PostComment key={comment._id} date={comment.date} commentId={comment._id} postId={this.props.id} text={comment.text}
                    avatar={comment.avatar} userId={commentUserId} username={comment.username} />
            })
        };


        let error = null;
        if (this.props.page.error.createComment) {
            error = this.props.page.error.createComment;
        }

        let deletePost = null;
        if (this.props.userId === this.props.user.id) {
            deletePost = <div className="post-info-button" onClick={this.showModalHandler}><p> <FaTrash /> </p></div>;
        }

        let commentSection = null;
        if (this.state.showComments) {
            commentSection = (<div className="post-comments">
                <div className="post-create-comment">
                    <form onSubmit={this.submitComment} >
                        <input type="text" onChange={this.changePostHandler} className="post-input" placeholder="Write Comment" name="comment" value={this.state.comment} />
                        <button type="submit" className="post-btn">Comment</button>
                    </form>
                </div>
                {error}
                {this.state.showComments ? comments : null}
            </div>)
        } else {
            commentSection = null;
        }

        let likeStatus = null;
        if (this.props.status === "Like") {
            likeStatus = (
                <p className="post-likeStatus like" >
                    <FaHeart />
                </p>
            )
        } else {
            likeStatus = (
                <p className="post-likeStatus unlike" >
                    <FaHeart />
                </p>
            )
        }

        console.log(this.props)
        return (

            <Aux>
                <Backdrop clicked={this.showModalHandler} show={this.state.showModal} />
                <Modal cancelClick={this.showModalHandler} confirmClick={() => this.props.onDeletePost(this.props.id)} show={this.state.showModal} >Are you sure you want to delete this post?</Modal>
                <div className="post" >
                    <div className="post-avatar">
                        <img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt={this.props.username} /></div>
                    <div>
                        <div className="post-username-date" >
                            <NavLink to={"/user/" + this.props.userId}>
                                <p className="post-username">{this.props.username}</p>
                            </NavLink>
                            <div className="post-date"><p>{date}</p></div>
                        </div>

                        <p className="post-text">{this.props.text}</p>
                        <div className="post-info">
                            <div className="post-info-like" >
                                <div className="post-info-button" onClick={() => this.onLikeClick(this.props.id)}>
                                    <p className="post-info-num-likes" >{this.props.likes}</p>
                                    {likeStatus}
                                </div>
                                <div className="post-info-button" onClick={this.onToggleComments} >
                                    <p > <FaComment /></p>
                                </div>
                                {deletePost}
                            </div>
                        </div>

                    </div>
                    {commentSection}
                </div>
            </Aux >
        )
    }
}

const mapDisaptchToProps = dispatch => {
    return {
        onSubmitCommentDashboard: (id, comment) => dispatch(actions.createCommentDashboard(id, comment)),
        onSubmitCommentPage: (id, comment) => dispatch(actions.createCommentPage(id, comment)),
        onDeletePost: (id) => dispatch(actions.deletePost(id)),
        onGetPosts: (user) => dispatch(actions.getPosts(user)),
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        page: state.page
    }
}

export default withRouter(connect(mapStateToProps, mapDisaptchToProps)(Post));