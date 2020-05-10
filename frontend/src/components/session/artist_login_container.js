import { connect } from "react-redux";
import { loginArtist, removeSessionErrors } from "../../actions/user_session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (artist) => dispatch(loginArtist(artist)),
  removeSessionErrors: () => dispatch(removeSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);