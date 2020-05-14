import React from "react";
import Countdown from "./countdown";
import EventIndexContainer from "./events_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


class EventShow extends React.Component {
  componentDidMount() {
    this.props.fetchArtists()
      .then(() => this.props.fetchEvent(this.props.match.params.id))
  }

  render() {
    const { artist, event } = this.props;
    if (!event) return null;
    const date = new Date(event.date);
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const year = date.getFullYear();
    // const hour = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    return (
      <div className="event-show">
        <div className="event-show-container">
          <div className="event-show-header">
            <div className="event-show-calendar">
              <Calendar value={date}/>
            </div>
            <div className="event-show-countdown">
              <Countdown date={date}/>
            </div>
            <div className="event-show-buy">
              <div className="event-show-buynow">
                <FontAwesomeIcon icon={faShoppingCart}/> Buy Now
              </div>
              <div className="event-show-price">
                $ {event.price.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="event-show-main">
            <div className="event-show-main-container">
              <div className="event-show-pic">
                <img src={artist.imageurl}/>
              </div>
              <div className="event-show-body">
                <div className="event-show-name">
                  {event.name}
                </div>
                <div className="event-show-description">
                  {event.description}
                </div>
              </div>
            </div>
          </div>

          <div className="event-show-upcoming">
            <EventIndexContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default EventShow;