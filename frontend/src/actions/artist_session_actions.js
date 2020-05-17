import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';
import {RECEIVE_SESSION_ERRORS} from './user_session_actions'

// Artist action constants
export const RECEIVE_CURRENT_ARTIST = "RECEIVE_CURRENT_ARTIST";
export const RECEIVE_ARTIST_LOGOUT = "RECEIVE_ARTIST_LOGOUT";

// Artist regular action creators
export const receiveCurrentArtist = currentArtist => ({
  type: RECEIVE_CURRENT_ARTIST,
  currentArtist
});

// Session errors regular action creators
export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Artist thunk action creators
export const signupArtist = formArtist => dispatch => (
   APIUtil.signupArtist(formArtist).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('artist', true);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    const artistCopy = Object.assign({}, res.data.artist, decoded)
    delete artistCopy['password']
    localStorage.setItem("artistId", artistCopy.id);
    dispatch(receiveCurrentArtist(artistCopy))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
);

export const loginArtist = artist => dispatch => (
  APIUtil.loginArtist(artist).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('artist', true);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    const artistCopy = Object.assign({}, res.data.artist, decoded)
    localStorage.setItem("artistId", artistCopy.id);
    delete artistCopy['password']
    dispatch(receiveCurrentArtist(artistCopy))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
)

