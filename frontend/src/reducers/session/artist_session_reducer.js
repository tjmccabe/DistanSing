import {
  RECEIVE_CURRENT_ARTIST,
} from '../../actions/artist_session_actions';
import { RECEIVE_LOGOUT } from '../../actions/user_session_actions'

const initialState = null

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_ARTIST:
      // console.log(action)
      return action.currentArtist
    case RECEIVE_LOGOUT:
      return null
    default:
      return state;
  }
}