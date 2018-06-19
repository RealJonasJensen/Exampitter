import React from "react";

import "./Modal.css";

const Modal = props => {

    return (
        props.show ? <div className="modal"></div> : null
    )
}

export default Modal