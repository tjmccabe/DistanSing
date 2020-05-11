import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';

// We have not created this action yet, but will do so in the next step
import { logout } from './actions/user_session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    let preloadedState = {};

    // Create a dynamic preconfigured state we can immediately add to our store
    if (localStorage.artist) {
      preloadedState = { session: { isAuthenticated: true, artist: JSON.parse(localStorage.artist) } }
    } else {
      preloadedState = { session: { isAuthenticated: true, user: JSON.parse(localStorage.user) } }
    }

    // debugger

    store = configureStore(preloadedState);

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

  ReactDOM.render(<Root store={store} />, root);
});