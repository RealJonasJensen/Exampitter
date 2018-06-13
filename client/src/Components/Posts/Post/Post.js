import React, { Component } from "react";

import { connect } from "react-redux";

import "./Post.css";

class Post extends Component {



    render() {

        console.log(this.props.user)
        return (
            <div className="post" >
                <div className="post-avatar"><img src={process.env.PUBLIC_URL + "/Images/" + this.props.avatar} alt="" /></div>
                <div>
                    <p>{this.props.username}</p>
                    <p>{this.props.text}</p>
                    <p>{this.props.likes === 1 ? this.props.likes + " Like" : this.props.likes + " Likes"}</p>
                    <p className="post-like" onClick={() => this.props.clicked(this.props.id)} >{this.props.status}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Post);