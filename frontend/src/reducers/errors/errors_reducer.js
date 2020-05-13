import { combineReducers } from "redux";
import session from "./session_errors_reducer";
import events from "./event_errors_reducer";

const errorsReducer = combineReducers({
  session,
  events
});

export default errorsReducer;