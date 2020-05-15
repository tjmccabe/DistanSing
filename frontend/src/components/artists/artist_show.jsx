import React from "react";
import ShowEventItem from "./show_event_item";
import { Link } from "react-router-dom";
import DeleteEvent from "./delete_event";
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
    const DeleteButton = deleteEvent ? <button onClick={this.handleDelete} >Try Me</button> : null;
    const ArtistEvents =
      artist.artistEvents && Object.values(artist.artistEvents)[0] ? (
        <div className="artist-event-index-container">
          <h1>{artist.artistname}'s upcoming events:</h1>
          <div className="show-item-container">
            {Object.values(artist.artistEvents).map((event, idx) => (
              <div key={idx}>
                <DeleteEvent event={event} fetchArtist={fetchArtist} deleteEvent={deleteEvent}/>
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
        <Link to={`/artists/${this.props.match.params.id}/edit`}>Edit</Link>
      ) : null;
    const CreateEvent =
      owner ? (
        <Link to='/events/create'>Create Event</Link>
      ) : null;
    return (
      <div className="artist-show-container">
        <div className="artist-bio-container">
          <img src={`${artist.imageurl}`} alt="" />
          <div className="artist-bio">
            <h1>{artist.artistname}</h1>
            <p className="artist-bio-text">{temp_text}</p>
          </div>
        </div>
        {EditArtist}
        {CreateEvent}
        {ArtistEvents}
      </div>
    );
  }
}
export default ArtistShow;
