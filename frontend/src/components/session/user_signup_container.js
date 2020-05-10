import { connect } from "react-redux";
import { signup, removeSessionErrors } from "../../actions/user_session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => ({
  formType: "Username",
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  removeSessionErrors: () => dispatch(removeSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
