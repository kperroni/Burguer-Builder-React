import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispath => {
    setTimeout(() => {
      dispath(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkMcqiy_gKtl5VektCJV895dsG0DUIp0s';
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkMcqiy_gKtl5VektCJV895dsG0DUIp0s';
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(JSON.stringify(err.response.data.error.message)));
      });
  };
};
