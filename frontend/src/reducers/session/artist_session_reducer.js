import {
  RECEIVE_CURRENT_ARTIST,
  RECEIVE_ARTIST_SIGN_IN
} from '../../actions/artist_session_actions';
import {RECEIVE_LOGOUT} from '../../actions/user_session_actions'

const initialState = {
  isAuthenticated: false,
  artist: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_ARTIST:
      return {
        ...state,
        isAuthenticated: !!action.currentArtist,
        artist: action.currentArtist
      };
    case RECEIVE_LOGOUT:
      return {
        isAuthenticated: false,
        artist: undefined
      };
    case RECEIVE_ARTIST_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    default:
      return state;
  }
}