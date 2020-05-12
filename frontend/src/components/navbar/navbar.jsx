import React from "react";
import { withRouter, Link } from "react-router-dom";

class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { loggedIn, current, loggedInAsUser, openModal } = this.props;
    const name = loggedInAsUser && current ? current.username : loggedIn && current ? current.artistname : null;
    
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
        <button className="nav-bar-filter">
          Log Out
        </button>
      </div>
    ) : null;

    const Welcome = loggedIn ? (
      <div className="nav-bar-greeting" >Welcome, {name}!</div>
    ) : null;

    const SearchPlaceholder = null; // come back to this when we can

    return (
      <header className="nav-bar">
        <div className="nav-container">
          <div className="nav-bar-left">
            <Link to="/" className="nav-logo">
              <div className="nav-logo-img">
                Image Here
              </div>
              <div className="nav-logo-name">
                DistanSing
              </div>
            </Link>
          </div>
          {SearchPlaceholder}
          <div className="nav-bar-right">
            {UserLogin}
            {UserSignup}
            {ArtistLogin}
            {Welcome}
            {Logout}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
