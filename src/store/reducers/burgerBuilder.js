import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENTS_PRICE = {
  salad : 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
  building: false
}

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1});
  const updatedState = updateObject(state, {ingredients: updatedIngredients, totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName], building: true});
  return updatedState;
}

const removeIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1});
  const updatedState = updateObject(state, {ingredients: updatedIngredients, totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName], building: true});
  return updatedState;
}

const setIngredients = (state, action) => {
  return updateObject(state, {ingredients: action.ingredients,
    totalPrice: 4,
    building: false,
    error: false});
}

const ingredientsFetchFail = (state) => {
  return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT: 
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: 
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: 
      return setIngredients(state, action);
    case actionTypes.INGREDIENTS_FETCH_FAILED: 
      return ingredientsFetchFail(state);
    default:
      return state;
  }
}

export default reducer;