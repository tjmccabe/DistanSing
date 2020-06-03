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
      streaming: false,
      isTime: false
    }
    this.showArtist = this.showArtist.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
    this.startStreaming = this.startStreaming.bind(this);
  }

  componentDidMount() {
    const { artist, currentId } = this.props;
    setTimeout(() => {
      if (artist.id !== currentId && currentId) {
        this.setState({ streaming: true })
      }
      this.setState({ isTime: true })
    }, 10000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
    if (this.props.event && this.props.event.streaming && !this.state.streaming) {
      this.startStreaming()
      return
    }
  }

  startStreaming() {
    this.setState({ streaming: true });
  }

  buyTicket() {
    this.props.updateUser({ id: this.props.currentId, events: this.props.event.id })
  }

  showArtist() {
    this.props.history.push(`/artists/${this.props.artist.id}`)
  }

  showStream() {
    const { artist, event, currentId } = this.props;
    if (artist.id === currentId) {
      return <ArtistStreamShowContainer artist={artist} event={event} featured={true} />
    } else if (currentId) {  
      return <UserStreamShow artist={artist} event={event} currentId={currentId}/>
    } else {
      return null
    }
  }

  render() {
    const { artist, event, currentId, currentUserPurchase, loggedInAsArtist } = this.props;
    if (!event || !artist) return null;
    const date = new Date(event.date);
    const hasTicket = currentUserPurchase ? currentUserPurchase.events[event.id] : false;
    const StartStreamButton = (currentId === artist.id && this.state.isTime) ? (
      <button
        onClick={this.startStreaming}
        id="start-streaming-event-show"
      >
        It's showtime!
        <br/>
        Click Here to Go LIVE
      </button>
    ) : null;

    const BuyButton = event.over ? (
      <div className="fake-buy-button"></div>
    ) : hasTicket ? (
      <div className="event-show-buy">
        <div className="event-show-buynow">
          <FontAwesomeIcon icon={faCheck} /> Ticket Reserved
        </div>
      </div>
    ) : !currentId ? (
      <div className="event-show-buy">
        <div onClick={() => this.props.openModal("userLogin")} className="event-show-buynow" >Log in as a User<br/>to reserve a ticket</div>
      </div>
    ) : loggedInAsArtist ? (
      <div className="fake-buy-button"></div>
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

    const CalendarElement = this.state.isTime ? (
      <div className="fake-calendar"></div>
    ) : (
      <Calendar value={date} />
      )

    if (this.state.streaming && currentId === artist.id) return this.showStream()
    
    if (this.state.streaming && hasTicket) return this.showStream()

    return (
      <div className="event-show">
        <div className="event-show-container">
          <div
            className="background-test"
            style={{
              backgroundImage: `url("https://distansing-dev.s3-us-west-1.amazonaws.com/big-crowd.jpg")`,
              alt: `${artist.artistname}`
            }}
          >
            <div className="background-test-filter">

              <div className="event-show-main">
                <div className="event-show-main-container">
                  <div className="pic-contain">
                    <div className="event-show-pic"
                      style={{ backgroundImage: `url(${event.imageurl})`, alt: `${event.name}` }}
                    >
                      <div className="event-show-pic-filter">
                      </div>
                    </div>
                  </div>
                  <div className="event-show-body">
                    <h1 className="event-show-name">{event.name}</h1>
                    <div className="event-show-artistname">
                      Presented by <span className="event-artistname-link" onClick={this.showArtist}>{artist.artistname}</span>
                    </div>
                    <div className="event-show-description">
                      {event.description}
                    </div>
                  </div>
                </div>
                {BuyButton}
              </div>

              <div className="event-show-header">
                <div className="event-show-calendar">
                  {CalendarElement}
                </div>
                <div className="event-show-countdown">
                  <Countdown
                    artist={artist}
                    currentId={currentId}
                    date={date}
                    hasTicket={hasTicket}
                    StartStreamButton={StartStreamButton}
                    isOver={false}
                  />
                </div>
              </div>
              <div className="event-show-upcoming">
                <div className="event-upcoming-container">
                  <h1>
                    {`Upcoming events by ${artist.artistname}:`}
                  </h1>
                  <EventIndexContainer artist={artist} />
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventShow;