import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
  const btnClasses = [classes.Button, classes[props.btnType]];
  if(props.disabled){
    btnClasses.push(classes.Disabled)
  }
  return (
    <button 
      className={btnClasses.join(' ')} 
      disabled={props.disabled}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
}

export default button; 