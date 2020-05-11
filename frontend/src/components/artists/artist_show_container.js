import { connect } from "react-redux";
import ArtistShow from "./artist_show";
import {} from "../../actions/artist_actions";

const mapStateToProps = (state, ownProps) => ({
  events: Object.values(state.entities.events),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
