import { combineReducers } from "redux";
import events from "./events_reducer";

const entitiesReducer = combineReducers({
  events
});

export default entitiesReducer;
