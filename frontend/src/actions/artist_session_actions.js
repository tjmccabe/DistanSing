import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

// Artist action constants
export const RECEIVE_CURRENT_ARTIST = "RECEIVE_CURRENT_ARTIST";
export const RECEIVE_ARTIST_LOGOUT = "RECEIVE_ARTIST_LOGOUT";
export const RECEIVE_ARTIST_SIGN_IN = "RECEIVE_ARTIST_SIGN_IN";

// Errors action constants
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS";

// Artist regular action creators
export const receiveCurrentArtist = currentArtist => ({
  type: RECEIVE_CURRENT_ARTIST,
  currentArtist
});

export const receiveArtistSignIn = () => ({
  type: RECEIVE_ARTIST_SIGN_IN
});

export const logoutArtist = () => ({
  type: RECEIVE_ARTIST_LOGOUT
});

// Session errors regular action creators
export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const removeSessionErrors = () => ({
  type: REMOVE_SESSION_ERRORS
})

// Artist thunk action creators
export const signupArtist = artist => dispatch => (
  APIUtil.signupArtist(artist).then(() => (
    dispatch(receiveArtistSignIn())
  ), err => (
    dispatch(receiveSessionErrors(err.response.data))
  ))
);

export const loginArtist = artist => dispatch => (
  APIUtil.loginArtist(artist).then(res => {
    const {
      token
    } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentArtist(decoded))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
)

export const logoutArtist = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(logoutArtist());
};