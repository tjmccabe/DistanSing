import { connect } from "react-redux";
import Splash from "./splash";
import { fetchEvents } from "../../actions/event_actions"
import { fetchArtists, fetchArtist } from "../../actions/artist_actions"

const mapStateToProps = (state, ownProps) => ({
  events: Object.values(state.entities.events),
  artists: Object.values(state.entities.artists)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchArtists: () => dispatch(fetchArtists()),
  fetchArtist: artistId => dispatch(fetchArtist(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);