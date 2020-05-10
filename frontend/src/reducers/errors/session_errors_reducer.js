import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../../actions/user_session_actions';

import { RECEIVE_CURRENT_ARTIST } from '../../actions/artist_session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case RECEIVE_CURRENT_ARTIST:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;