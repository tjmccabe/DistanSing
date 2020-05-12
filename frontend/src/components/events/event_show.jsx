import React from "react";

class EventShow extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    const { event } = this.props;
    if (!event) return null;
    const date = new Date(event.date);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return (
      <div className="event-show">
        <div className="event-show-container">
          <div className="event-show-header">
            <div className="event-show-calendar">
              {month} {day} {year} 
            </div>
            <div>
              Countdown
            </div>
            <div>
              Buy Now {event.price}
            </div>
          </div>
          
          <div className="event-show-main">
            <div>
              Artist Pic
            </div>
            <div>
              {event.name}
              Description
            </div>
          </div>

          <div className="event-show-upcoming">
            Events Index filtered by event.artist._id
          </div>
        </div>
      </div>
    )
  }
}

export default EventShow;