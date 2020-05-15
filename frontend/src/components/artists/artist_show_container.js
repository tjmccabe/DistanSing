import { connect } from "react-redux";
import ArtistShow from "./artist_show";
import { fetchArtist } from "../../actions/artist_actions";

const mapStateToProps = (state, ownProps) => {
  const loggedInAsArtist = !!state.session.artist;
  const artist = state.entities.artists ? state.entities.artists[ownProps.match.params.id] : null;
  const owner = loggedInAsArtist && state.session.artist.id === ownProps.match.params.id ? 
      state.entities.artists[state.session.artist.id] : null;
  return {
    artist,
    owner,
    loggedInAsArtist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
