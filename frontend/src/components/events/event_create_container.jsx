import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import { openModal } from "../../actions/modal_actions";
import EventCreateForm from './event_create_form';

const mapStateToProps = state => ({
  loggedIn: (!!state.session.user) || (!!state.session.artist),
  errors: Object.values(state.errors.events),
})

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event)),
  openModal: modal => dispatch(openModal(modal))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateForm);