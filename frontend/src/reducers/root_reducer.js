import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import ui from './ui/ui_reducer';
import entities from "./entities/entities_reducer";

const RootReducer = combineReducers({
  entities,
  session,
  ui,
  errors,
});

export default RootReducer;