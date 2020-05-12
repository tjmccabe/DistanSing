import { combineReducers } from 'redux';
import { RECEIVE_CURRENT_USER, RECEIVE_LOGOUT } from '../../actions/user_session_actions'
import { RECEIVE_CURRENT_ARTIST } from '../../actions/artist_session_actions'
import user from './user_session_reducer';
import artist from './artist_session_reducer';

const isAuthenticated = (state = false, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return true;
    case RECEIVE_CURRENT_ARTIST:
      return true;
    case RECEIVE_LOGOUT:
      return false;
    default:
      return state;
  }
}

const sessionReducer = combineReducers({
  user,
  artist,
  isAuthenticated
});

export default sessionReducer;