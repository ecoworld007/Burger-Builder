import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <div><strong>Current Price = {props.totalPrice.toFixed(2)}</strong></div>
      {controls.map(ctrl => {
        return <BuildControl 
          key={ctrl.label} 
          label={ctrl.label} 
          added={() => props.addIngredient(ctrl.type)}
          removed={() => props.removeIngredient(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}/>
      })}
      <button className={classes.OrderButton} disabled={props.disabled}>ORDER NOW</button>
    </div>
  );
}

export default buildControls;