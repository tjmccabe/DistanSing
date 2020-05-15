import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ShowEventItem from "../artists/show_event_item";

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null
    }
  }

  search = async function (fragment) {
    let results = {};
    axios.post("/api/artists/search", { fragment })
      .then(res => {
        results.artists = res.data;
        axios.post("/api/events/search", { fragment })
          .then(res => {
            results.events = res.data;
            this.setState({ searchResults: results })
          })
      })
  }

  componentDidMount() {
    this.search(this.props.match.params.fragment);
  }

  render() {
    const { match, history } = this.props;
    const { searchResults } = this.state;
    if (!searchResults) return null;
    return (
      <div className="">
        <h1>All results for: {match.params.fragment}</h1>
        <h2>Artists</h2>
        <div>
          {searchResults.artists.map(artist => 
            <div 
              key={artist._id}
              className="artist-feature-item"
              style={{backgroundImage: `url(${artist.imageurl})` }}
              onClick={() => history.push(`/artists/${artist._id}`)}
              >
                <div className="artist-feature-item-filter">
                  <div>{artist.artistname}</div>
                  <div>{artist.genre === "None" ? null : artist.genre}</div>
                </div>
            </div>  
          )}
        </div>
        <h2>Events</h2>
        <div>
          {searchResults.events.map(event => 
            <ShowEventItem
              key={event._id}
              event={event}
            />
          )}
        </div>
      </div>
    )
  } 
}

export default withRouter(SearchIndex);