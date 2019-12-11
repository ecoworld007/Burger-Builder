import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}
const reducer = (state=initialState, action) => {
  switch(action.type){
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newBurger = {
        ...action.order,
        id: action.orderId
      }
      return {
        ...state,
        orders: state.orders.concat(newBurger),
        loading: false,
        purchased: true
      };
    default:
      return state;
  }
}

export default reducer;