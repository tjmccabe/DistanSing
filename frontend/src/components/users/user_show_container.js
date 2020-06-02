import { connect } from "react-redux";
import { fetchUser, updateUserImage, deleteEvent } from "../../actions/user_actions";
import { fetchEvents } from "../../actions/event_actions";
import UserShow from "./user_show";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
  })

}

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchUser: id => dispatch(fetchUser(id)),
  updateUserImage: user => dispatch(updateUserImage(user)),
  deleteEvent: user => dispatch(deleteEvent(user))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserShow));