import React from 'react';
import { withRouter } from "react-router-dom";
import { GoTrashcan } from "react-icons/go";


class ShowEventItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(e) {
    const { user, owner, event, deleteEvent, fetchArtist, fetchUser } = this.props;
    if(e.target.closest('.delete-button') || e.target.closest('.refund-button')) {
      if (owner) {
        deleteEvent(event._id).then(() => fetchArtist(event.artist))
      } else {
        // debugger
        deleteEvent({ id: user._id, events: event._id })
          .then(() => fetchUser(user._id))
      }
    } else {
      this.props.history.push(`/events/${event._id}`)
    }
  }

  render() {
    const { event, owner, user } = this.props;
    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };
    const month = months[event.date.slice(5, 7)];
    const day = new Date(event.date).getDate();
    const year = new Date(event.date).getFullYear();
    const hour = new Date(event.date).getHours();
    const minute = new Date(event.date).getMinutes();

    return (
      <div
        className="show-item"
        onClick={this.handleClick}
      >
        <div className="event-pic" style={{ backgroundImage: `url(${event.imageurl})` }}>
          <div className="event-pic-filter"></div>
        </div>
        <div className="item-details">
          <h4>{event.name}</h4>
          <div>{month} {day}, {year}, {(hour % 12) === 0 ? 12 : hour % 12}:{minute < 10 ? `0${minute}` : minute}{hour > 11 ? "PM" : "AM"}</div>
          <p>{event.description}</p>
        </div>
        <div className="show-item-right">
          <div className="show-item-price">{event.price.toFixed(2)}</div>
          {owner ? (
            <GoTrashcan className="delete-button"/>
          ) : user ? (
            <button className="refund-button">Refund</button>
          ) : null }
        </div>
      </div>
    );
  }
}

export default withRouter(ShowEventItem);
