import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3PXkzn5azzrV5XvCdmz_EGjKn9kV65eo', {email, password, returnSecureToken: true})
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
}