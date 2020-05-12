import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from "../../actions/artist_actions";

const ArtistsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ARTISTS:
      newState = action.artists.data;
      return newState;
    case RECEIVE_ARTIST:
      newState = action.artist.data;
      return newState;
    default:
      return state;
  }
};

export default ArtistsReducer;
