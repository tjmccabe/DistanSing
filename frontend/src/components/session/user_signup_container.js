import { connect } from "react-redux";
import { signupUser, receiveSessionErrors } from "../../actions/user_session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.session),
  formType: "userSignup",
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signupUser(user)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
