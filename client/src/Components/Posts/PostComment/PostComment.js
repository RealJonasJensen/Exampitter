import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import * as actions from "../../../store/actions/index";

import { FaTrash } from 'react-icons/fa';

import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";

import "./PostComment.css";

class PostComment extends Component {

    state = {
        showModal: false
    }


    showModalHandler = () => {
        // console.log("Post: " + postId)
        // console.log("Comment: " + commentId)
        this.setState(prevState => {
            return { showModal: !prevState.showModal }
        })
    }

    confirmClickHandler = event => {
        // console.log("Delete Comment")
        //console.log(this.props.history.location.pathname)
        this.props.onDeleteComment(this.props.postId, this.props.commentId, this.props.history.location.pathname)
    }



    render() {

        // Comment id and post id
        // this.props.postId, this.props.commentId

        // console.log(this.props)
        // console.log(this.props.user)

        let date = null
        if (this.props.date) {
            date = this.props.date.split("T")[0].split("-").reverse().join("-");
        }

        let deleteComment = null;
        // console.log(this.props)
        if (this.props.userId === this.props.user.id) {
            deleteComment = <div className="post-comments-delete" ><p onClick={this.showModalHandler} className="post-comment-button" ><FaTrash /></p></div>
        }


        return (
            <div className="post-comments-comment">
                <Backdrop show={this.state.showModal} clicked={this.showModalHandler} />
                <Modal confirmClick={this.confirmClickHandler} cancelClick={this.showModalHandler} show={this.state.showModal}>Are you sure you want to delete this comment?</Modal>
                <div className="post-comments-img">
                    <img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt={this.props.username} />
                </div>
                <div>
                    <div className="post-comments-username-date">
                        <p className="post-comments-username">
                            {this.props.username}
                        </p>
                        <p className="post-comments-date" >
                            {date}
                        </p>
                    </div>
                    <div className="post-comments-text">
                        <p> {this.props.text} </p>
                    </div>
                    {deleteComment}
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteComment: (postId, commentId, path) => dispatch(actions.deleteComment(postId, commentId, path))
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComment));