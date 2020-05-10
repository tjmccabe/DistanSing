import React from "react";
import { withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="nav-bar">
        <div className="nav-container">
          <div className="nav-logo">
            <div>
              Image Here
            </div>
            <a href="/#/" className="nav-logo-name">
              DistanSing
            </a>
          </div>

          {this.props.currentUser ? (
            <div>
              {this.props.user.name.split(" ")[0]}
              <button className="nav-logout-button" onClick={this.props.logout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <a href="/#/login" className="nav-login-button">
                Log in
              </a>
              or
              <a href="/#/signup" className="nav-signup-button">
                Sign up
              </a>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
