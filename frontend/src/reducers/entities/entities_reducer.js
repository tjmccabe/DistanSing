import { combineReducers } from "redux";
import events from "./events_reducer";
import artists from './artists_reducer'


const entitiesReducer = combineReducers({
  events,
  artists
});

export default entitiesReducer;
