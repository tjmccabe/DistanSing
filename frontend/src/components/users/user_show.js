import React from "react";
import ShowEventItem from "../artists/show_event_item";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class UserShow extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    
    const UserEvents = 
      user.userEvents && Object.values(user.userEvents)[0] ? ( <div className="user-event-index-container">
          <h1>Your upcoming events:</h1>
          <div className="show-items-container">
            {Object.values(user.userEvents).map((event) => (
              <ShowEventItem key={event._id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <div className="user-event-index-container">
          <h1>No upcoming events. Reserve a ticket today!</h1>
        </div>)

    const UserActions = (
      <div className="user-actions">
        <Link
          id="edit-artist-link"
          to={`/users/${this.props.match.params.id}/edit`}
        >
          <div className="artist-show-button-filter">
            <FontAwesomeIcon icon={faEdit} />
            <div className="needs-padding">
              Edit User Info
            </div>
          </div>
        </Link>
      </div>
    )

    const defURL = "https://distansing-dev.s3-us-west-1.amazonaws.com/default_artist_image_mask_on.jpg"

    const Instructions = `Welcome to DistanSing! You can search for events from 
      the navbar or visit an Artist's profile or an event page to see a list of 
      that Artist's upcoming events. Feel free to attend any live events going 
      on now or create an Artist account and host your own!`

    const newDate = new Date(user.date)
    const memberSince = (newDate.getMonth() + 1) + '/' + newDate.getDate()

    const Information = user.email === 'demo@user.com' ? (
      <p className="user-bio-text">{Instructions}</p>
    ) : <p className="user-bio-text">Member since: {memberSince}</p>

    return (
      <div className="user-show-container">
        {UserActions}
        <div className="user-bio-container">
          <div className="user-pic" style={{ backgroundImage: `url(${defURL})` }}>
            <div className="user-pic-filter"></div>
          </div>
          <div className="user-bio">
            <h1>{user.username}</h1>
            {Information}
          </div>
        </div>
        {UserEvents}
      </div>
    );
  }
}

export default UserShow;