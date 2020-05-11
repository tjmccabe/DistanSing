import { connect } from "react-redux";
import EventsIndex from "./events_index";
import { } from "../../actions/event_actions"

const mapStateToProps = (state, ownProps) => ({
  events: Object.values(state.entities.events),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
