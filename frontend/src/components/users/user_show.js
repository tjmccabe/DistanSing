import React from "react";
import ShowEventItem from "../artists/show_event_item";
import { Link } from "react-router-dom";

class UserShow extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;
    if (user === null || user === undefined || user === false)
      return null;
    const temp_text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const UserEvents = 
      user.userEvents && Object.values(user.userEvents)[0] ? ( <div className="user-event-index-container">
          <h1>{user.username}'s upcoming events:</h1>
          <div className="show-item-container">
            {Object.values(user.userEvents).map((event) => (
              <ShowEventItem key={event._id} event={event} />
            ))}
          </div>
        </div>
      ) : null;
    return (
      <div className="user-show-container">
        <div className="user-bio-container">
          <img src={`${user.imageurl}`} alt="" />
          <div className="user-bio">
            <h1>{user.username}</h1>
            <p className="user-bio-text">{temp_text}</p>
          </div>
        </div>
        <Link to={`/users/${this.props.match.params.id}/edit`}>Edit</Link>
        {UserEvents}
      </div>
    );
  }
}

export default UserShow;
