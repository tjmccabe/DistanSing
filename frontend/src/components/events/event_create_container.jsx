import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import { openModal } from "../../actions/modal_actions";
import { fetchArtist } from "../../actions/artist_actions";
import EventCreateForm from './event_create_form';

const mapStateToProps = state => ({
  loggedInArtist: state.session.artist,
  artist: state.entities.artists[state.session.artist._id],
  errors: Object.values(state.errors.events),
})

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event)),
  openModal: modal => dispatch(openModal(modal)),
  fetchArtist: artistId => dispatch(fetchArtist(artistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateForm);