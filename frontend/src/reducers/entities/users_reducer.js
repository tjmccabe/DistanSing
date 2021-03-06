import { RECEIVE_USER, RECEIVE_USERS } from "../../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/user_session_actions";

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
      newState = action.users.data;
      return newState;
    case RECEIVE_USER:
      if (action.user.data._id) {
        return Object.assign(newState, { [action.user.data._id]: action.user.data });
      }
      return Object.assign(newState, { [action.user.data.id]: action.user.data })
    case RECEIVE_CURRENT_USER:
      if (action.currentUser._id) {
        return Object.assign(newState, { [action.currentUser._id]: action.currentUser });
      }
      return Object.assign(newState, { [action.currentUser.id]: action.currentUser })
    default:
      return state;
  }
};

export default UsersReducer;