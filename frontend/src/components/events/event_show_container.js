import { connect } from "react-redux";
import EventShow from "./event_show";
import { fetchEvent } from "../../actions/event_actions";
import { fetchArtists } from "../../actions/artist_actions";
import { updateUser } from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
  let artist = state.entities.events[ownProps.match.params.id] ?
  state.entities.artists[state.entities.events[ownProps.match.params.id].artist] : null;
  let currentId = state.session.artist ? state.session.artist._id : state.session.user ? state.session.user._id : null;
  return {
    event: state.entities.events[ownProps.match.params.id],
    artist,
    currentId
  }
};


const mapDispatchToProps = (dispatch) => ({
  fetchEvent: id => dispatch(fetchEvent(id)),
  fetchArtists: () => dispatch(fetchArtists()),
  updateUser: user => dispatch(updateUser(user)),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(EventShow);
