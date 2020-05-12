import { connect } from "react-redux";
import { signupArtist } from "../../actions/artist_session_actions";
import { receiveSessionErrors } from '../../actions/user_session_actions';
import SignupForm from "./signup_form";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.session),
  formType: "artistSignup",
});

const mapDispatchToProps = (dispatch) => ({
  signup: (artist) => dispatch(signupArtist(artist)),
  removeSessionErrors: () => dispatch(receiveSessionErrors([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
