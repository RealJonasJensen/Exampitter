import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Logout extends Component {
    render() {
        this.props.onLogoutUser()
        this.props.history.push("/")

        return (
            <div></div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout);