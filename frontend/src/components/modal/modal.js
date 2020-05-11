import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import ArtistLoginContainer from "../session/artist_login_container";
import ArtistSignupContainer from "../session/artist_signup_container";
import UserLoginContainer from "../session/user_login_container";
import UserSignupContainer from "../session/user_signup_container";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "artistSignup":
      component = <ArtistSignupContainer closeModal={closeModal}/>
      break;
    case "artistLogin":
      component = <ArtistLoginContainer closeModal={closeModal}/>
      break;
    case "userSignup":
      component = <UserSignupContainer closeModal={closeModal}/>
      break;
    case "userLogin":
      component = <UserLoginContainer closeModal={closeModal}/>
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
