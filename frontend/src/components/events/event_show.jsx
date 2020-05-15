import React from "react";
import Countdown from "./countdown";
import EventIndexContainer from "./events_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ArtistStreamShow from '../streams/artist_stream_show';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false
    }
    this.startStream = this.startStream.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

  componentDidMount() {
    this.props.fetchArtists()
      .then(() => this.props.fetchEvent(this.props.match.params.id))
  }

  startStream() {
    this.setState({ streaming: true })
  }

  buyTicket() {
    this.props.updateUser({ id: this.props.currentId, events: this.props.match.params.id })
  }

  showStream() {
    const { artist, currentId } = this.props;
    if (artist._id === currentId) {
      return <ArtistStreamShow performingArtist={true} />;
    } else if (currentId) {
      return <ArtistStreamShow audience={true} />;
    } else {
      return null;
    }
  }

  render() {
    const { artist, event, currentId } = this.props;
    if (!event) return null;
    const date = new Date(event.date);
    // const isTime = date.getTime() < (new Date()).getTime() ? true : false;

    return this.state.streaming ? 
      <div>
        {this.showStream()}
      </div>
     : (
      <div className="event-show">
        <div className="event-show-container">
          <div className="event-show-header">
            <div className="event-show-calendar">
              <Calendar value={date}/>
            </div>
            <div className="event-show-countdown">
              <Countdown startStream={this.startStream} artist={artist} date={date} currentId={currentId}/>
            </div>
            <div 
              onClick={this.buyTicket}
              className="event-show-buy"
            >
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