import React, { Component } from "react";

import { withRouter, NavLink } from "react-router-dom"

import { connect } from "react-redux";

import PostComment from "../PostComment/PostComment";
import Modal from "../../UI/Modal/Modal";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../Hoc/Aux/Aux";

import * as actions from "../../../store/actions/index";

import "./Post.css";

class Post extends Component {

    state = {
        showComments: false,
        comment: "",
        showModal: false,
    }

    // componentDidMount() {
    //     console.log(this.props.history.location.pathname.split("/")[1])
    //     console.log(this.props.history.location)

    // }

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

        let comments = "loading..."
        if (this.props.comments) {
            comments = this.props.comments.map(comment => {
                //console.log(comment)
                return < PostComment key={comment._id} commentId={comment._id} postId={this.props.id} text={comment.text}
                    avatar={comment.avatar} userId={comment.user._id} username={comment.username} />
            })
        };

        // // Post user Id
        // console.log(this.props.userId)
        // // Logged in user Id
        // console.log(this.props.user.id)

        let deletePost = null;
        if (this.props.userId === this.props.user.id) {
            deletePost = <div><p className="post-delete" onClick={this.showModalHandler} >Delete Post</p></div>;
        }

        return (
            <Aux>
                <Backdrop clicked={this.showModalHandler} show={this.state.showModal} />
                <Modal cancelClick={this.showModalHandler} confirmClick={() => this.props.onDeletePost(this.props.id)} show={this.state.showModal} >Are you sure you want to delete this post?</Modal>
                <div className="post" >
                    <div className="post-avatar"><img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt="" /></div>
                    <div>
                        <NavLink to={"/user/" + this.props.user.id}><p className="post-username">{this.props.username}</p></NavLink>
                        <p className="post-text">{this.props.text}</p>
                        <div className="post-info">
                            <div><p>{this.props.likes === 1 ? this.props.likes + " Like" : this.props.likes + " Likes"}</p></div>
                            <div><p className="post-like" onClick={() => this.onLikeClick(this.props.id)} >{this.props.status}</p></div>
                            <div><p className="post-comment-btn" onClick={this.onToggleComments} >Show Comments</p></div>
                            {deletePost}
                        </div>

                    </div>
                    <div className="post-comments">
                        <div className="post-create-comment">
                            <form onSubmit={this.submitComment} >
                                <input type="text" onChange={this.changePostHandler} className="post-input" placeholder="Write Comment" name="comment" value={this.state.comment} />
                                <button type="submit" className="post-btn"> Comment </button>
                            </form>
                        </div>
                        {this.state.showComments ? comments : null}
                    </div>
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
    }
}

export default withRouter(connect(mapStateToProps, mapDisaptchToProps)(Post));