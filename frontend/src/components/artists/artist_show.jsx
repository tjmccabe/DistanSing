import React from "react";
import ShowEventItem from "./show_event_item";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: true,
    }
  }

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
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
    const { artist, owner, deleteEvent, fetchArtist } = this.props;
    if (!artist) return null;

    // this function gets all an artist's future events and sorts them by soonest
    const OnlyUpcoming = artist.artistEvents && Object.values(artist.artistEvents)[0] ? (
      Object.values(artist.artistEvents).filter(ev => (
        new Date(ev.date).getTime() > new Date().getTime()
      ))
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    ) : []

    const Past = artist.artistEvents && Object.values(artist.artistEvents)[0] ? (
      Object.values(artist.artistEvents).filter(ev => (
        new Date(ev.date).getTime() < new Date().getTime()
      ))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    ) : []


    const ArtistEvents =
        <div className="event-index-container">
          <h1>Events from {artist.artistname}:</h1>
          <div className="event-toggle">
            <h2 
              className="upcoming-events-tab tab-selected"
              onClick={e => this.handleUpcoming(e)}
            >
              Upcoming
            </h2>
            <h2 
              className="past-events-tab"
              onClick={e => this.handlePast(e)}
            >
              Past
            </h2>
          </div>
          <div className="show-items-container">
            {this.state.upcoming ? (
              OnlyUpcoming[0] ? (
                OnlyUpcoming.map((event, idx) => (
                <div className='show-item-container' key={idx}>
                  <ShowEventItem
                    event={event}
                    owner={owner}
                    deleteEvent={deleteEvent}
                    fetchArtist={fetchArtist}
                  />
                </div>
              ))) : (
                <div className="no-events">
                  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/guitar+(1).svg" alt="guitar-svg"/>
                  <h2>There are no upcoming events.</h2>
                </div>
                
              )
            ) : (
              Past[0] ? (
                Past.map((event, idx) => (
                <div className='show-item-container' key={idx}>
                  <ShowEventItem
                    event={event}
                    owner={owner}
                    deleteEvent={deleteEvent}
                    fetchArtist={fetchArtist}
                  />
                </div>
              ))) : (
                <div className="no-events">
                  <img src="https://distansing-dev.s3-us-west-1.amazonaws.com/guitar+(1).svg" alt="guitar-svg"/>
                  <h2>There are no past events.</h2>
                </div>
              )
            )}
          </div>
        </div>
    
    const EditArtist =
      owner ? (
        <Link id="edit-artist-link" to={`/artists/${this.props.match.params.id}/edit`}>
          <div className="artist-show-button-filter">
            <FontAwesomeIcon icon={faEdit} /> 
            <div className="needs-padding">
              Edit Artist Info
            </div>
          </div>
        </Link>
      ) : null;
    const CreateEvent =
      owner ? (
        <Link id="create-event-link" to='/events/create'>
          <div className="artist-show-button-filter">
            <FontAwesomeIcon icon={faPlus} />
            <div className="needs-padding">
              Create Event
            </div>
          </div>
        </Link>
      ) : null;

    const OwnerActions = owner ? (
      <div className="owner-actions">
        {EditArtist}
        {CreateEvent}
      </div>
    ) : null;

    const Instructions = `Welcome to DistanSing! You can search for events from 
      the navbar or visit an Artist's profile or an event page to see a list of 
      that Artist's upcoming events. Feel free to attend any live events going 
      on now after logging in as a User, or log in as an Artist and host your own!`

    const Information = artist.email === 'demo@artist.com' ? (
      <p className="artist-bio-text">{Instructions}</p>
    ) : <p className="artist-bio-text">{artist.bio}</p>

    return (
      <div className="artist-show-container">
        <div
          className="background-artist-show"
          style={{
            backgroundImage: `url("https://distansing-dev.s3-us-west-1.amazonaws.com/john-matychuk-gUK3lA3K7Yo-unsplash.jpg")`,
          }}
        >
          <div className="background-artist-show-filter">
             <div className="artist-show-main">
              <div className="artist-bio-fixed">
                <div className="artist-bio-container">
                  <div className="artist-pic" style={{ backgroundImage: `url(${artist.imageurl})`}}>
                    <div className="artist-pic-filter"></div>
                  </div>
                  <div className="artist-bio">
                    <h1>{artist.artistname}</h1>
                    {OwnerActions}
                    {Information}
                  </div>
                </div>
              </div>
              {ArtistEvents}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default withRouter(ArtistShow);
