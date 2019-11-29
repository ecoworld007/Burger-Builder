import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map( (_, key) => {
      return (<BurgerIngredient key={igKey+key} type={igKey}/>);
    });
  }).reduce((acc, el) => {
    return acc.concat(el);
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {transformedIngredients.length ? transformedIngredients : 'Please add some ingredients!!!'}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}

export default burger;