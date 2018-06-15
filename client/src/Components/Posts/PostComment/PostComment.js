import React from "react";

import "./PostComment.css";

const PostComment = props => {

    console.log(props)

    return (
        <div className="post-comments-comment">
            <div className="post-comments-img">
                <img src={process.env.PUBLIC_URL + "/Images/" + props.avatar} alt="" />
            </div>
            {props.username}
            <div className="post-comments-text">
                {props.text}
            </div>
        </div>
    )
}

export default PostComment;