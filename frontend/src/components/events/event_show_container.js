import { connect } from "react-redux";
import EventShow from "./event_show";
import { fetchEvents } from "../../actions/event_actions";

const mapStateToProps = (state, ownProps) => {
  return ({
    event: state.entities.events[ownProps.match.params.id]
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
