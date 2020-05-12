import { connect } from 'react-redux';
import { updateEvent } from '../../actions/event_actions';
import EventEditForm from './event_edit_form';

const mapDispatchToProps = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event))
})

export default connect(null, mapDispatchToProps)(EventEditForm);