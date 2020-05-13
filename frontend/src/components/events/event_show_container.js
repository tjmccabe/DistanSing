import { connect } from "react-redux";
import EventShow from "./event_show";
import { fetchEvent } from "../../actions/event_actions";
import { fetchArtist } from "../../actions/artist_actions";

const mapStateToProps = (state, ownProps) => {
  return ({
    event: state.entities.events[ownProps.match.params.id],
    // artist: state.entities.artists[state.entities.events[ownProps.match.params.id].id],
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: id => dispatch(fetchEvent(id)),
  fetchArtist: id => dispatch(fetchArtist(id)),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(EventShow);
