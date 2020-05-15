import React from "react";
import Countdown from "./countdown";
import EventIndexContainer from "./events_index_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import ArtistStreamShowContainer from '../streams/artist_stream_show_container';
import UserStreamShow from '../streams/user_stream_show';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false
    }
    this.startStreaming = this.startStreaming.bind(this);
    this.showArtist = this.showArtist.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

  componentDidMount() {
    this.props.fetchArtists()
      .then(() => this.props.fetchEvent(this.props.match.params.id))
  }

  componentDidUpdate(prevProps) {
    clearInterval(this.timer)
    if (this.props.event && this.props.event.streaming && !this.state.streaming) {
      this.startStreaming()
      return
    }
    if (this.props.event && !this.state.streaming) {
      this.timer = setInterval(() => this.props.fetchEvent(this.props.match.params.id), 5000)
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startStreaming() {
    if (this.timer) clearInterval(this.timer);
    this.setState({ streaming: true });
  }

  buyTicket() {
    this.props.updateUser({ id: this.props.currentId, events: this.props.match.params.id })
  }

  showArtist() {
    this.props.history.push(`/artists/${this.props.artist._id}`)
  }

  showStream() {
    const { artist, currentId, event } = this.props;
    if (artist._id === currentId) {
      return <ArtistStreamShowContainer artist={artist}/>
    } else if (currentId) {  // NEED TO CHECK IF THEY HAVE A TICKET
      return <UserStreamShow artist={artist} event={event}/>
    } else {
      return null
    }
  }

  render() {
    const { artist, event, currentId, currentUserPurchase } = this.props;
    if (!event || !artist) return null;
    const date = new Date(event.date);
    const isTime = date.getTime() < (new Date()).getTime() ? true : false;
    const hasTicket = currentUserPurchase ? currentUserPurchase.events[event._id] : false;
    const StartStreamButton = (currentId === artist._id && isTime) ? (
      <button onClick={this.startStreaming}>START STREAMING TO YOUR FANS</button>
    ) : null;
    
    const BuyButton = hasTicket ? (
      <div className="event-show-buy">
        <div className="event-show-buynow">
          <FontAwesomeIcon icon={faCheck} /> Bought
        </div>
      </div>
    ) : !currentId ? (
      <div className="event-show-buy">
        <div className="event-show-buynow">Log in to reserve ticket</div>
      </div>
    ) : event.price === 0 ? (
      <div onClick={this.buyTicket} className="event-show-buy">
        <div className="event-show-buynow">
          <FontAwesomeIcon icon={faTicketAlt} /> Reserve Ticket
        </div>
        <div className="event-show-price">(Free)</div>
      </div>
    ) : (
      <div onClick={this.buyTicket} className="event-show-buy">
        <div className="event-show-buynow">
          <FontAwesomeIcon icon={faShoppingCart} /> Buy Now
        </div>
        <div className="event-show-price">$ {event.price.toFixed(2)}</div>
      </div>
    );

    console.log(currentId)
    console.log(artist._id)
    console.log(artist.artistname)
    console.log(this.state)
    if (this.state.streaming && currentId === artist._id) return this.showStream()

    if (this.state.streaming && hasTicket) return this.showStream()

    return (
      <div className="event-show">
        <div className="event-show-container">
          {StartStreamButton}
          <div className="event-show-header">
            <div className="event-show-calendar">
              <Calendar value={date} />
            </div>
            <div className="event-show-countdown">
              <Countdown artist={artist} date={date} hasTicket={hasTicket} />
            </div>
            {BuyButton}
          </div>

          <div className="event-show-main">
            <div className="event-show-main-container">
              <div className="event-show-pic" onClick={this.showArtist}>
                <img src={artist.imageurl} alt={artist.artistname} />
              </div>
              <div className="event-show-body">
                {/* <div className="event-show-artistname" onClick={this.props.history.push(`/artists/${artist._id}`)}> */}
                <div className="event-show-artistname">{artist.artistname}</div>
                <div className="event-show-name">{event.name}</div>
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
    );
  }
}

export default EventShow;