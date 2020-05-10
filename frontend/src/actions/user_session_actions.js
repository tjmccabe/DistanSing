import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

// User action constants
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// Errors action constants
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

// User regular action creators
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveLogout = () => ({
  type: RECEIVE_LOGOUT
});

// Session errors regular action creators
export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// User thunk action creators
export const signupUser = user => dispatch => (
  APIUtil.signupUser(user).then(() => (
    dispatch(receiveUserSignIn())
  ), err => (
    dispatch(receiveSessionErrors(err.response.data))
  ))
);

export const loginUser = user => dispatch => (
  APIUtil.loginUser(user).then(res => {
    const {
      token
    } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
)

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(receiveLogout());
};