import React from 'react';
import { withRouter } from "react-router-dom";

class ShowEventItem extends React.Component {

  render() {
    const { event } = this.props;
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
        onClick={() => this.props.history.push(`/events/${event._id}`)}
      >
        <div className="event-pic" style={{ backgroundImage: `url(${event.imageurl})` }}>
          <div className="event-pic-filter"></div>
        </div>
        <div className="item-details">
          <h4>{event.name}</h4>
          <div>{month} {day}, {year}, {(hour % 12) === 0 ? 12 : hour % 12}:{minute < 10 ? `0${minute}` : minute}{hour > 11 ? "PM" : "AM"}</div>
          <p>{event.description}</p>
        </div>
        <div className="show-item-price">{event.price.toFixed(2)}</div>
      </div>
    );
  }
}

export default withRouter(ShowEventItem);
