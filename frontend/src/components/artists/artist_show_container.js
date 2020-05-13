import { connect } from "react-redux";
import ArtistShow from "./artist_show";
import { fetchArtist } from "../../actions/artist_actions";

const mapStateToProps = (state, ownProps) => {
  let artist = state.entities.artists ? state.entities.artists[ownProps.match.params.id] : null;
  return {
    artist,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
