import { connect } from "react-redux";
import { fetchUser, updateUserImage, deleteEvent } from "../../actions/user_actions";
import { fetchEvents } from "../../actions/event_actions";
import NewUserShow from "./new_user_show";

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUserShow);