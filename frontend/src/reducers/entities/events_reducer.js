import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT,
} from "../../actions/event_actions";

export default function (state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events.data;
    case RECEIVE_EVENT:
      newState[action.event.data._id] = action.event.data;
      newState[action.event.data._id].artist = newState[action.event.data._id].artist._id 
      return newState;
    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
    }
}
