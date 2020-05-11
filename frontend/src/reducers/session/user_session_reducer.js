import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT,
} from '../../actions/user_session_actions';

const initialState = null

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.currentUser
    case RECEIVE_LOGOUT:
      return null
    default:
      return state;
  }
}