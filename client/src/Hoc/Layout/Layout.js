import React from "react";

import Toolbar from "../../Components/Toolbar/Toolbar";

const Layout = props => {
    return (
        <main>
            <Toolbar />
            {props.children}
        </main>
    )
}

export default Layout;