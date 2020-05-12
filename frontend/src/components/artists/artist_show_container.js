import { connect } from "react-redux";
import ArtistShow from "./artist_show";
import { fetchArtist, fetchArtists } from "../../actions/artist_actions";

const mapStateToProps = (state, ownProps) => ({
  artist: state.entities.artists[ownProps.match.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId)),
  fetchArtists: () => dispatch(fetchArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistShow);
