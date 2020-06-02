import React from "react";
import ShowEventItem from "../artists/show_event_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: true
    }
    this.handleUpcoming = this.handleUpcoming.bind(this);
    this.handlePast = this.handlePast.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleUploadClick() {
    document.querySelector('.hidden-upload').click();
  }

  handleUserEdit(e) {
    const { user, updateUserImage } = this.props;
    const imagefile = e.target.files[0];
    const formData = new FormData();
    if (imagefile) formData.append('imagefile', imagefile);
    formData.append('id', user._id);
    updateUserImage(formData);
  }

  handleUpcoming(e) {
    this.setState({ upcoming: true });
    e.currentTarget.classList.add('tab-selected');
    document.querySelector('.past-events-tab').classList.remove('tab-selected');
  }

  handlePast(e) {
    this.setState({ upcoming: false });
    e.currentTarget.classList.add('tab-selected');
    document.querySelector('.upcoming-events-tab').classList.remove('tab-selected');
  }

  render() {
    const { user, deleteEvent } = this.props;
    if (!user) return null;

    const OnlyUpcoming = user.userEvents && Object.values(user.userEvents)[0] ? (
      Object.values(user.userEvents).filter(ev => (
        new Date(ev.date).getTime() > new Date().getTime()
      ))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    ) : []

    const Past = user.userEvents && Object.values(user.userEvents)[0] ? (
      Object.values(user.events).filter(ev => (
        new Date(ev.date).getTime() < new Date().getTime()
      ))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    ) : []

    const UserEvents =
      <div className="user-event-index-container">
        <h1>Your Events</h1>
        <div className="user-event-toggle">
          <h2 
            className="upcoming-events-tab tab-selected"
            onClick={e => this.handleUpcoming(e)}>
            Upcoming
            </h2>
          <h2 
            className="past-events-tab"
            onClick={e => this.handlePast(e)}>
            Past
            </h2>
        </div>
        <div className="user-event-divider"></div>
        <div className="show-items-container">
          {this.state.upcoming ? (
            OnlyUpcoming[0] ? (
              OnlyUpcoming.map((event, idx) => (
                <div className='show-item-container' key={idx}>
                  <ShowEventItem
                    event={event}
                  />
                  <button
                    className="refund-btn"
                    onClick={() => {
                      deleteEvent({ id: user._id, events: event._id })
                    }}
                  >
                    Refund
                 </button>
                </div>
              ))) : (
                <h1>No upcoming events. Reserve a ticket today!</h1>
              )
          ) : (
              Past[0] ? (
                Past.map((event, idx) => (
                  <div className='show-item-container' key={idx}>
                    <ShowEventItem
                      event={event}
                    />
                  </div>
                ))) : (
                  <h1>You haven't attended any events.</h1>
                )
            )}
        </div>
      </div>

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date(user.date)
    const memberSince = monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear()
    return (
      <div className="user-show-container">
        <div className="user-content-container">
          <div className="user-bio">  
            <div className="user-pic-container">
              <div
                className="user-pic"
                style={{ backgroundImage: `url(${user.imageurl})` }}
              >
                <div className="user-pic-filter"></div>
              </div>
              <button
                className="user-pic-edit-btn"
                onClick={this.handleUploadClick}>
                <FontAwesomeIcon icon={faCamera} /> Update Image
              </button>
              <input
                className="hidden-upload"
                hidden type="file"
                onChange={this.handleUserEdit} />
            </div>
            <h1>{user.username}</h1>
            <p className="user-bio-text">Member since {memberSince}</p> 
          </div>
          {UserEvents}
        </div>
      </div>
    );
  }
}

export default UserShow;