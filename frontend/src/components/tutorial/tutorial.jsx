import React from "react";

class Tutorial extends React.Component {
  render() {
    return (
      <div className="tutorial">
        <div className="artist-tutorial">
          <h1>
            Artist Tutorial
          </h1>
          <div>
            how to use artist
          </div>
        </div>
        <div className="user-tutorial">
          <h1>
            User Tutorial
          </h1>
          <div>
            how to use user
          </div>
        </div>
      </div>
    )
  }
}

export default Tutorial;