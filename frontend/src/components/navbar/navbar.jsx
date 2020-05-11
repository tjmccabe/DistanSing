import React from "react";
import { withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {

  }

  render() {
    const { loggedIn, current, loggedInAsUser, openModal } = this.props;
    const name = loggedInAsUser ? current.username : loggedIn ? current.artistname : null;
    // debugger

    const ArtistLogin = loggedIn ? null : (
      <div
        className="nav-bar-button artist-login-button"
        onClick={() => openModal("artistLogin")}
      >
        <button className="nav-bar-filter">
          Artists
        </button>
      </div>)

    const UserLogin = loggedIn ? null : (
      <div
        className="nav-bar-button user-login-button"
        onClick={() => openModal("userLogin")}
      >
        <button className="nav-bar-filter">
          Log In
        </button>
      </div>)

    const UserSignup = loggedIn ? null : (
      <div
        className="nav-bar-button user-signup-button"
        onClick={() => openModal("userSignup")}
      >
        <button className="nav-bar-filter">
          Sign Up
        </button>
      </div>)

    const Logout = loggedIn ? (
      <div
        className="nav-bar-button logout-button"
        onClick={this.props.logout}
      >
        <div>Welcome, {name}!</div>
        <button className="nav-bar-filter">
          Log Out
        </button>
      </div>
    ) : null;

    const SearchPlaceholder = null; // come back to this when we can

    return (
      <header className="nav-bar">
        <div className="nav-container">
          <div className="nav-logo nav-bar-left">
            <div>
              Image Here
            </div>
            <a href="/#/" className="nav-logo-name">
              DistanSing
            </a>
          </div>
          {SearchPlaceholder}
          <div className="nav-bar-right">
            {UserLogin}
            {UserSignup}
            {ArtistLogin}
            {Logout}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
