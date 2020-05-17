import { connect } from 'react-redux';
import LiveChat from './live_chat';

const mapStateToProps = state => ({
  currentUser: state.session.user ? state.entities.users[state.session.user._id] : state.session.artist ? state.entities.artists[state.session.artist._id] : null
})

export default connect(mapStateToProps)(LiveChat);