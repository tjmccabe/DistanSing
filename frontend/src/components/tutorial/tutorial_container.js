import { connect } from "react-redux";
import Tutorial from "./tutorial";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = (state, ownProps) => {
  const loggedInAsArtist = !!state.session.artist ? state.session.artist : null ;
  const loggedInAsUser = !!state.session.user ? state.session.user : null;
  return ({
    loggedInAsArtist,
    loggedInAsUser
  })
}

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial)