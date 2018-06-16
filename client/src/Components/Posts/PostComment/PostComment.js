import React from "react";

import "./PostComment.css";

const PostComment = props => {

    console.log(props)

    return (
        <div className="post-comments-comment">
            <div className="post-comments-img">
                <img src={process.env.PUBLIC_URL + "/Images/" + props.avatar} alt="" />
            </div>
            <div>
                <p className="post-comments-username">
                    {props.username}
                </p>
                <div className="post-comments-text">
                    <p> {props.text} </p>
                </div>
            </div>
        </div>
    )
}

export default PostComment;