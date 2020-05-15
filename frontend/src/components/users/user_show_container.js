import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { fetchEvents } from "../../actions/event_actions";
import UserShow from "./user_show";

const mapStateToProps = (state, ownProps) => {
  return({
    user: state.entities.users[ownProps.match.params.id],
  })

}

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchUser: id => dispatch(fetchUser(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserShow);