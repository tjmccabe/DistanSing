import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import EventCreateForm from './event_create_form';

const mapStateToProps = state => ({
  errors: Object.values(state.errors.events)
})

const mapDispatchToProps = dispatch => ({
  createEvent: event => dispatch(createEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateForm);