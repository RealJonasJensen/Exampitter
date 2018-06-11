import React from "react";

import "./Post.css";

const Post = props => {

    return (
        <div className="post" >
            <div className="post-avatar"><img src={process.env.PUBLIC_URL + "/Images/no_image.png"} alt="" /></div>
            <div className="post-text"> This is my post </div>
            <p>0 Likes</p>
            <p>Like</p>
        </div>
    )
}

export default Post;