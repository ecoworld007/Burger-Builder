import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
const layout = (props) => {
  return (
    <Aux>
      <div>
      Toolbar, Sidebar, Backdrop
    </div>
    <main className={classes.Content}>
      <p>{props.children}</p>
    </main>
    </Aux>
  );
}

export default layout;