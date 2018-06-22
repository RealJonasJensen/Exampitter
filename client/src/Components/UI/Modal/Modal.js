import React from "react";

import "./Modal.css";

const Modal = props => {

    return (
        props.show ? <div className="modal">
            <p className="modal-text">{props.children}</p>
            <div className="modal-btns">
                <div onClick={props.cancelClick} className="modal-btn modal-cancel"><p>Cancel</p></div>
                <div onClick={props.confirmClick} className="modal-btn modal-confirm"><p>Confirm</p></div>
            </div>
        </div> : null
    )
}

export default Modal