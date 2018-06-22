import React, { Component } from "react";

import { connect } from "react-redux";

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

    render() {

        // Comment id and post id
        // this.props.postId, this.props.commentId

        // console.log(this.props)
        // console.log(this.props.user)

        let deleteComment = null;
        if (this.props.userId === this.props.user.id) {
            deleteComment = <div className="post-comments-delete" onClick={this.showModalHandler}><p>Delete Comment</p> </div>
        }


        return (
            <div className="post-comments-comment">
                <Backdrop show={this.state.showModal} clicked={this.showModalHandler} />
                <Modal cancelClick={this.showModalHandler} show={this.state.showModal}>Are you sure you want to delete this comment?</Modal>
                <div className="post-comments-img">
                    <img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt={this.props.username} />
                </div>
                <div>
                    <p className="post-comments-username">
                        {this.props.username}
                    </p>
                    <div className="post-comments-date"><p>Date</p></div>
                    <div className="post-comments-text">
                        <p> {this.props.text} </p>
                    </div>
                </div>
                {deleteComment}
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PostComment);