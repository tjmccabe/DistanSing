import { connect } from "react-redux";
import EventsIndex from "./events_index";
import { fetchEvents } from "../../actions/event_actions"

const mapStateToProps = (state, ownProps) => {
  let events = state.entities.events ? Object.values(state.entities.events).filter(event => event.artist === ownProps.artist._id) : [];
  return({
    events,
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
