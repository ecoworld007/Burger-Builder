import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active>Burger Builder</NavigationItem>
      <NavigationItem link='/'>Order Summary</NavigationItem>
    </ul>
  )
}

export default navigationItems;