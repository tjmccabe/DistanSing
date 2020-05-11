import { connect } from "react-redux";
import { logout } from "../../actions/user_session_actions";
import { openModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = (state, ownProps) => {
  const loggedInAsUser = (!!state.session.user);
  const loggedInAsArtist = (!!state.session.artist);

  return {
    loggedIn: (loggedInAsUser || loggedInAsArtist),
    loggedInAsUser,
    loggedInAsArtist,
    current: loggedInAsArtist ? state.session.artist : loggedInAsUser ? state.session.user : null
}};

const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
