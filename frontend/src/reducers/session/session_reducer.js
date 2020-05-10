import { combineReducers } from 'redux';
import user from './user_session_reducer';
import artist from './artist_session_reducer';

const sessionReducer = combineReducers({
  user,
  artist
});

export default sessionReducer;