import React from "react";
import { withRouter } from "react-router-dom";

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.handleArtistProfile = this.handleArtistProfile.bind(this);
    this.handleUserProfile = this.handleUserProfile.bind(this);
  }

  handleArtistProfile() {
    const { loggedInAsArtist, loggedInAsUser, openModal, closeModal, history } = this.props;
    closeModal();
    if (loggedInAsArtist) {
      history.push(`/artists/${loggedInAsArtist.id}`)
    } else if (loggedInAsUser) {
      history.push(`/users/${loggedInAsUser.id}`)
    } else {
      openModal("artistLogin")
    }
  }

  handleUserProfile() {
    const { loggedInAsArtist, loggedInAsUser, openModal, closeModal, history } = this.props;
    closeModal();
    if (loggedInAsArtist) {
      history.push(`/artists/${loggedInAsArtist.id}`)
    } else if (loggedInAsUser) {
      history.push(`/users/${loggedInAsUser.id}`)
    } else {
      openModal("userLogin")
    }
  }
  
  render() {
    return (
      <div className="tutorial-modal">
        <div className="tutorial-intro">
          Welcome to DistanSing, where we are all only 6 beats apart! When it 
          comes to connecting with your favorite artists and other fans, nothing
          should stop you. DistanSing was developed to ensure that, even in dire
          circumstances, individuals have a place to gather and share their love
          of music, while also staying safe and healthy.

          <ul>
            <li><div>Artists:</div>Create your next virtual event to sell tickets to your fans. When your event starts, return to the event page to begin streaming.</li>
            <li><div>Users:</div>Browse events and purchase tickets to events. When the event starts, wait for the artist to start streaming and enjoy!</li>
          </ul>
        </div>
        <div className="tutorial">
          <div className="artist-tutorial">
            <h1>
              Artist Tutorial
            </h1>

            <ol>
              <li>Sign up or log in using the 'Artists' button.</li>
              <li>Create an event by navigating to <a onClick={this.handleArtistProfile}>your profile</a> and clicking the 
                'Create Event' button. You can also view a complete list of your past and future events on this page.</li>
              <li>Go to the event's page when it's time to start your event.</li>
              <li>Click the 'Go Live' button and 'Start Streaming'!</li>
            </ol>
          </div>
          <div className="user-tutorial">
            <h1>
              User Tutorial
            </h1>
            <ol>
              <li>Sign up or log in using the 'Sign Up' or 'Log In' button.</li>
              <li>Browse through events from the home page or by using the search bar.</li>
              <li>Purchase a ticket on the event's page. A complete list of your purchased tickets is viewable on <a onClick={this.handleUserProfile}>your profile</a>.</li>
              <li>Come back to the event's page when it's time for the event to start.</li>
              <li>Enjoy your event, and remember to stay 6 feet apart!</li>
            </ol>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(Tutorial);