import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { fetchArtist, fetchArtists } from './actions/artist_actions'
import { fetchUser } from './actions/user_actions'
import { logout } from './actions/user_session_actions';
import { updateArtist } from './util/artist_api_util'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    let preloadedState = {};

    // Create a dynamic preconfigured state we can immediately add to our store
    if (localStorage.jwtToken) {
      if (localStorage.artist) {
        preloadedState = { session: { isAuthenticated: true, artist: decodedUser } }
      } else if (localStorage.user) {
        preloadedState = { session: { isAuthenticated: true, user: decodedUser } }
      }
    }

    store = configureStore(preloadedState);
    if (localStorage.artist) store.dispatch(fetchArtist(decodedUser.id))
    if (localStorage.user) store.dispatch(fetchUser(decodedUser.id))

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }
  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');
  window.fetchArtist = fetchArtist
  window.fetchArtists = fetchArtists
  window.updateArtist = updateArtist
  window.store = store
  ReactDOM.render(<Root store={store} />, root);
});