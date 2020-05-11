import { connect } from "react-redux";
import { loginUser, receiveSessionErrors } from "../../actions/user_session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(loginUser(user)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
  // closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
