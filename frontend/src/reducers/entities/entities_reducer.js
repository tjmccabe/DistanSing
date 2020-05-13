import { combineReducers } from "redux";
import events from "./events_reducer";
import artists from './artists_reducer'
import users from './users_reducer'


const entitiesReducer = combineReducers({
  events,
  artists,
  users
});

export default entitiesReducer;
