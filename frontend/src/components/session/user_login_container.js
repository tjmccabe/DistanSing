import { connect } from "react-redux";
import { loginUser, receiveSessionErrors } from "../../actions/user_session_actions";
import LoginForm from "./login_form";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.session),
  formType: "userLogin"
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(loginUser(user)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
