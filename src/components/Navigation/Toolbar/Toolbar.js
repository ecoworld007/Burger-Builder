import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <div>Menu</div>
      <div>Logo</div>
      <nav>...</nav>
    </div>
  );
}

export default toolbar;