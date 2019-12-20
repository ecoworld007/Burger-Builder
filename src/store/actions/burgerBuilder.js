import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const setIngredientFetchFailed = () => {
  return {
    type: actionTypes.INGREDIENTS_FETCH_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-64336.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      }).catch(error => {
        dispatch(setIngredientFetchFailed());
      });
  }
}