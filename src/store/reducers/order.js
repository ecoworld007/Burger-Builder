import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const initPurchase = (state) => {
  return updateObject(state, {purchased: false});
}

const purchaseBurgerStart = (state) => {
  return updateObject(state, {loading: true});
}

const purchaseBurgerFail = (state) => {
  return updateObject(state, {loading: false});
}

const purchaseBurgerSuccess = (state, action) => {
  const newBurger = {
    ...action.order,
    id: action.orderId
  }
  return updateObject(state, {orders: state.orders.concat(newBurger),
    loading: false,
    purchased: true});
}

const fetchOrdersStart = (state) => {
  return updateObject(state, {loading: true});
}

const fetchOrdersFail = (state) => {
  return updateObject(state, {loading: false});
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {loading: false,
    orders: action.orders});
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case actionTypes.INIT_PURCHASE:
      return initPurchase(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFail(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    default:
      return state;
  }
}

export default reducer;