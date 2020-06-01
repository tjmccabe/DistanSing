import React from "react";

class Tutorial extends React.Component {
  render() {
    return (
      <div className="tutorial">
        <div className="artist-tutorial">
          <h1>
            Artist Tutorial
          </h1>
          <ol>
            <li>Signup or login using the 'Artists' button.</li>
            <li>Create an event for your fans to attend by clicking the 'Create Event' button.</li>
            <li>Come back to the event's page when it's time to start your event.</li>
            <li>Go Live!</li>
          </ol>
        </div>
        <div className="user-tutorial">
          <h1>
            User Tutorial
          </h1>
          <ol>
            <li>Signup or login using the 'Sign Up' or 'Log In' button.</li>
            <li>Browse through events from the home page or through the search bar.</li>
            <li>Once you've found an event to attend, purchase a ticket for the event.</li>
            <li>Come back to the event's page when it's time for the event to start.</li>
            <li>Enjoy your event!</li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Tutorial;