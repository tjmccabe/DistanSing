import React from "react";
import { withRouter, Link } from "react-router-dom";
import { throttle } from 'throttle-debounce'
import SearchBar from '../search/search_bar';

class NavBar extends React.Component {
  componentDidMount() {
    this.listenForScroll()
  }

  componentWillUnmount() {
    this.throttled.cancel();
  }

  listenForScroll() {
    this.throttled = throttle(200, () => check_if_scrolled());
    document.addEventListener("scroll", this.throttled)

    function check_if_scrolled() {
      let bar = document.getElementById('navbar')
      let html = document.getElementById('html')

      let pixelsFromTop = html.scrollTop;

      pixelsFromTop > 0 ? bar.classList.add("scrolled") : (
        bar.classList.remove("scrolled")
      )
    }
  }

  logoutRedirect() {
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    const { loggedIn, current, loggedInAsUser, openModal, loggedInAsArtist } = this.props;
    const name = loggedInAsUser && current ? current.username : loggedIn && current ? current.artistname : null;
    const id = loggedIn && current ? current._id : null;
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
        onClick={() => this.logoutRedirect()}
      >
        <button className="nav-bar-filter">
          Log Out
        </button>
      </div>
    ) : null;

    const Welcome = loggedInAsUser && current ? (
          <Link to={`/users/${id}`}>Welcome, {name}!</Link>
        ) : loggedInAsArtist && current ? (
          <Link to={`/artists/${id}`}>Welcome, {name}!</Link>
        )
      : null;

    return (
      <header className="nav-bar">
        <div className="nav-container" id="navbar">
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
          <SearchBar />
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
