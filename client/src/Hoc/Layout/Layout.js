import React from "react";

import Toolbar from "../../Components/Toolbar/Toolbar";

import Aux from "../Aux/Aux";

import "./Layout.css";

const Layout = props => {
    return (
        <Aux>
            <main>
                <Toolbar />
                {props.children}
            </main>
            <div className="responsive">
                <h3>There is no mobile version for this app yet!</h3>
                <p>I'm working on it. Please use a laptop or desktop until then!</p>
            </div>
        </Aux>
    )
}

export default Layout;