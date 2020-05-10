import { connect } from "react-redux";
import { signup, removeSessionErrors } from "../../actions/artist_session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => ({
  // 
  formType: "Name",
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  removeSessionErrors: () => dispatch(removeSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
