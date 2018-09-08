import React from 'react';

import AuxComponent from '../../hoc/AuxComponent';
import classes from './Layout.css';

const Layout = (props) => (
    <AuxComponent>
        <div>ToolBar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxComponent>
);

export default Layout;