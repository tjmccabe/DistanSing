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
          <div onClick={this.props.logout}>
            Log Out
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(NavBar);
