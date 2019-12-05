import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
  const ingredients = [];
  for(let ingredientName of Object.keys(props.ingredients)){
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }
  const output = ingredients.map(ig => {
    return (
      <span key={ig.name}
      style={{
        display: 'inline-block',
        padding: '10px',
        margin: '0 5px',
        textTransform: 'capitalize',
        border: '1px solid #ccc'
      }}>{ig.name}({ig.amount})</span>
    )
  })
  return (
    <div className={classes.Order}>
      <p>Ingredients: {output}</p>
      <p>Price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
    </div>
  )
}
export default order;