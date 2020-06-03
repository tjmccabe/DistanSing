import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import {fetchEvent, updateEvent} from "../../actions/event_actions";
import ArtistStreamShow from './artist_stream_show';

const mSTP = (state, ownProps) => ({
  eventId: ownProps.match.params.id,
  event: ownProps.event || state.entities.events[ownProps.match.params.id]
})

const mDTP = (dispatch) => ({
  fetchEvent: id => dispatch(fetchEvent(id)),
  updateEvent: event => dispatch(updateEvent(event))
})

export default withRouter(connect(mSTP, mDTP)(ArtistStreamShow))