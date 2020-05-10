import { connect } from "react-redux";
import { login, removeSessionErrors } from "../../actions/user_session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  removeSessionErrors: () => dispatch(removeSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
