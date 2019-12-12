import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    token
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password, isSignUp) => {
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3PXkzn5azzrV5XvCdmz_EGjKn9kV65eo';
  if(!isSignUp){
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3PXkzn5azzrV5XvCdmz_EGjKn9kV65eo';
  }
  return dispatch => {
    dispatch(authStart());
    axios.post(url, {email, password, returnSecureToken: true})
      .then(res => {
        dispatch(authSuccess(res.data.localId, res.data.idToken));
      })
      .catch(err => {
        console.log(err.response.data.error.message)
        dispatch(authFail(err));
      });
  }
}