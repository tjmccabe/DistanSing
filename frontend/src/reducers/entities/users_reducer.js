import { RECEIVE_USER, RECEIVE_USERS } from "../../actions/user_actions";
import {RECEIVE_CURRENT_USER} from "../../actions/user_session_actions";

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
      newState = action.users.data;
      return newState;
    case RECEIVE_USER:
      newState = Object.assign(newState, { [action.user.data._id]: action.user.data })
      return newState;
    case RECEIVE_CURRENT_USER:
      newState = Object.assign(newState, { [action.currentUser._id]: action.currentUser });
      return newState;
    default:
      return state;
  }
};

export default UsersReducer;