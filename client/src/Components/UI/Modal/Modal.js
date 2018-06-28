import React, { Component } from "react";

import "./Modal.css";

class Modal extends Component {

    confirmClickHandler = event => {
        this.props.confirmClick()
        this.props.cancelClick();
    }


    render() {

        return (
            this.props.show ? <div className="modal">
                <p className="modal-text">{this.props.children}</p>
                <div className="modal-btns">
                    <div onClick={this.props.cancelClick} className="modal-btn modal-cancel"><p>Cancel</p></div>
                    <div onClick={this.confirmClickHandler} className="modal-btn modal-confirm"><p>Confirm</p></div>
                </div>
            </div> : null
        )
    }

}

export default Modal;