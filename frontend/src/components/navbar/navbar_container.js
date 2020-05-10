import { connect } from "react-redux";
import { logout } from "../../actions/user_session_actions";
import { openModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.id,
  // user: state.entities.users[state.session.id],
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
