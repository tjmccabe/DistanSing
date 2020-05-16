import React from "react";
import ShowEventItem from "./show_event_item";
import DeleteEvent from "./delete_event";
import { Link, withRouter } from "react-router-dom";

class ArtistShow extends React.Component {
  // constructor(props){
  //   super(props)

  // }
  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.id);
  }

  

  render() {
    const { artist, owner, deleteEvent, fetchArtist } = this.props;
    if (!artist) return null;
    const temp_text = 
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const ArtistEvents =
      artist.artistEvents && Object.values(artist.artistEvents)[0] ? (
        <div className="artist-event-index-container">
          <h1>Upcoming events from {artist.artistname}:</h1>
          <div className="show-item-container">
            {Object.values(artist.artistEvents).map((event, idx) => (
              <div key={idx}>
                {owner ? (
                  <DeleteEvent
                    event={event}
                    fetchArtist={fetchArtist}
                    deleteEvent={deleteEvent}
                  />
                ) : null}
                <ShowEventItem
                  event={event}
                  owner={owner}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null;
    
    const EditArtist =
      owner ? (
        <Link id="edit-artist-link" to={`/artists/${this.props.match.params.id}/edit`}>
          <div className="artist-show-filter">
            Edit Artist Info
          </div>
        </Link>
      ) : null;
    const CreateEvent =
      owner ? (
        <Link id="create-event-link" to='/events/create'>
          <div className="artist-show-filter">
            Create Event
          </div>
        </Link>
      ) : null;

    const OwnerActions = owner ? (
      <div className="owner-actions">
        {EditArtist}
        {CreateEvent}
      </div>
    ) : null;

    return (
      <div className="artist-show-container">
        {OwnerActions}
        <div className="artist-bio-container">
          <div className="artist-pic" style={{ backgroundImage: `url(${artist.imageurl})`}}>
            <div className="artist-pic-filter"></div>
          </div>
          <div className="artist-bio">
            <h1>{artist.artistname}</h1>
            <p className="artist-bio-text">{temp_text}</p>
          </div>
        </div>
        {ArtistEvents}
      </div>
    );
  }
}
export default withRouter(ArtistShow);
