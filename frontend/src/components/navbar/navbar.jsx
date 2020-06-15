import React from "react";
import { withRouter, Link } from "react-router-dom";
import { throttle } from 'throttle-debounce'
import SearchBar from '../search/search_bar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { animateScroll } from "react-scroll";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstVisit: true,
    }
  }
  componentDidMount() {
    this.listenForScroll()
  }

  componentWillUnmount() {
    this.throttled.cancel();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
    if (!prevProps.artist && this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist._id}`);
    }
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

  creatorHighlight() {
    animateScroll.scrollToBottom();
    let footer = document.getElementById("footer");
    footer.classList.add("highlight");
    setTimeout(() => {
      footer.classList.remove("highlight")
    }, 600)
  }

  render() {
    const { loggedIn, current, loggedInAsUser, openModal, loggedInAsArtist } = this.props;
    const name = loggedInAsUser && current ? current.username : loggedIn && current ? current.artistname : null;
    const id = loggedIn && current ? current._id : null;
    const Tutorial = (
      <div 
        className="nav-bar-tutorial"
        onClick={() => {
          this.setState({firstVisit: false});
          openModal("tutorial")}}
      >
        Tutorial
        {this.state.firstVisit ? (
          <div className="tutorial-first-visit"> 
            If this is your first time on our site, click here to begin.
          </div>
        ): null}
      </div>
    )
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

    const Welcome =
      loggedInAsUser && current ? (
        <Link to={`/users/${id}`} className="nav-bar-welcome">
          <FontAwesomeIcon icon={faUserCircle} />
          <div className="nav-bar-username">{name}</div>
        </Link>

      ) : loggedInAsArtist && current ? (
        <Link to={`/artists/${id}`} className="nav-bar-welcome">
          <FontAwesomeIcon icon={faUserCircle} />
          <div className="nav-bar-username">{name}</div>
        </Link>
      ) : null;

    return (
      <header className="nav-bar">
        <div className="nav-container" id="navbar">
          <div className="nav-bar-left">
            <Link to="/" className="nav-logo">
              <div className="nav-logo-name">
                DistanSing
              </div>
            </Link>
            <div 
              className="nav-bar-about"
              onClick={() => this.creatorHighlight()}
            >
              Creators
            </div>
            {Tutorial}
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
