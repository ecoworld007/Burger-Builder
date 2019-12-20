import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    token
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiryDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
}

export const checkExpirationTime = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, (expirationTime * 1000));
  };
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
        localStorage.setItem('expiryDate', new Date(new Date().getTime() + res.data.expiresIn*1000));
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkExpirationTime(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
}

export const authStateCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(authLogout());
    }else{
      const expiryDate = new Date(localStorage.getItem('expiryDate'));
      if(expiryDate <= new Date()){
        dispatch(authLogout());
      }else{
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(userId, token));
        dispatch(checkExpirationTime((expiryDate.getTime()-new Date().getTime())/1000));
      }
    }
  }
}