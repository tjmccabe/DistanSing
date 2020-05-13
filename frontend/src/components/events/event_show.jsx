import React from "react";
import Countdown from "./countdown";

class EventShow extends React.Component {
  // componentDidMount() {
  //   this.props.fetchEvent(this.props.match.params.id)
  //     .then((res) => {
  //       // debugger
  //       this.props.fetchArtist(res.event.data.artist);
  //     })
  // }

  render() {
    const { event } = this.props;
    if (!event) return null;
    // "2020-05-12T17:05"
    // "2020-05-13T00:05:00.000+00:00"
    const date = new Date(event.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
      <div className="event-show">
        <div className="event-show-container">
          <div className="event-show-header">
            <div className="event-show-calendar">
              {month} {day} {year} {hour} {minutes} {seconds}
            </div>
            <div className="event-show-countdown">
              <Countdown date={date}/>
            </div>
            <div className="event-show-buy">
              Buy Now {event.price}
            </div>
          </div>
          
          <div className="event-show-main">
            <div>
              Artist Pic
            </div>
            <div>
              {event.name}
              {event.description}
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