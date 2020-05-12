import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from "../../actions/artist_actions";
import { RECEIVE_CURRENT_ARTIST } from "../../actions/artist_session_actions";

const ArtistsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ARTISTS:
      newState = action.artists.data;
      return newState;
    case RECEIVE_ARTIST:
      if (action.artist.data._id) {
        return Object.assign(newState, { [action.artist.data._id]: action.artist.data});
      }
      return Object.assign(newState, { [action.artist.data.id]: action.artist.data })
    case RECEIVE_CURRENT_ARTIST:
      if (action.currentArtist._id) {
        return Object.assign(newState, { [action.currentArtist._id]: action.currentArtist });
      }
      return Object.assign(newState, { [action.currentArtist.id]: action.currentArtist })
    default:
      return state;
  }
};

export default ArtistsReducer;
