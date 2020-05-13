import React from "react";
import { withRouter } from "react-router-dom";

class EventIndexItem extends React.Component {
  
  render() {
    const { event } = this.props;
    const month = new Date(event.date).getMonth();
    const day = new Date(event.date).getDate();
    const year = new Date(event.date).getFullYear();
    return (
      <div 
        className="event-index-item"
        onClick={() => this.props.history.push(`/events/${event._id}`)}
      >
        ---{event.name}---
        {month + 1} {day} {year}---
        {event.price}---
      </div>
    )
  }
}

export default withRouter(EventIndexItem);