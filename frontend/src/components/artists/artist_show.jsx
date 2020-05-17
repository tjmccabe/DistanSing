import React from "react";
import ShowEventItem from "./show_event_item";
import DeleteEvent from "./delete_event";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";


class ArtistShow extends React.Component {

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  render() {
    const { artist, owner, deleteEvent, fetchArtist } = this.props;
    if (!artist) return null;

    const ArtistEvents =
      artist.artistEvents && Object.values(artist.artistEvents)[0] ? (
        <div className="artist-event-index-container">
          <h1>Upcoming events from {artist.artistname}:</h1>
          <div className="show-items-container">
            {Object.values(artist.artistEvents).map((event, idx) => (
              <div className='show-item-container' key={idx}>
                <ShowEventItem
                  event={event}
                  owner={owner}
                  />
                {owner ? (
                  <DeleteEvent
                    event={event}
                    fetchArtist={fetchArtist}
                    deleteEvent={deleteEvent}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="artist-event-index-container">
          <h1>No upcoming events</h1>
            <div className="show-items-container"></div>
        </div>
      );
    
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
      <p className="user-bio-text">{Instructions}</p>
    ) : <p className="artist-bio-text">{artist.bio}</p>

    return (
      <div className="artist-show-container">
        {OwnerActions}
        <div className="artist-bio-container">
          <div className="artist-pic" style={{ backgroundImage: `url(${artist.imageurl})`}}>
            <div className="artist-pic-filter"></div>
          </div>
          <div className="artist-bio">
            <h1>{artist.artistname}</h1>
            {Information}
          </div>
        </div>
        {ArtistEvents}
      </div>
    );
  }
}
export default withRouter(ArtistShow);
