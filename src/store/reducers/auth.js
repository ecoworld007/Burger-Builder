import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  loading: false,
  error: null,
  userId: '',
  token: ''
}

const authStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const authSuccess= (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    userId: action.userId,
    token: action.token
  });
}

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
}
const reducer = (state=initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    default:
      return state;
  }
}

export default reducer;