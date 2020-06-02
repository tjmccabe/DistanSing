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
      <div className="search-results-container">
        <div
          className="background-search"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80")`,
          }}
        >
          <div className="background-search-filter">
            <h1 className="search-results-header">All results for: <span className="search-fragment">"{match.params.fragment}"</span></h1>
            <h2>Artists</h2>
            { searchResults.artists.length > 0 ? 
              <div className="search-artists-results">
                { searchResults.artists.map(artist => 
                <div 
                  key={artist._id}
                  className="artist-feature-item artist-search-item"
                  style={{
                    backgroundImage: `url(${artist.imageurl})`,
                    width: '200px',
                    height: '200px'
                  }}
                  onClick={() => history.push(`/artists/${artist._id}`)}
                  >
                    <div className="artist-feature-item-filter">
                      <div>{artist.artistname}</div>
                      <p>{artist.genre === "None" ? null : artist.genre}</p>
                    </div>
                </div>
                )}
              </div>
              : <div className="search-artists-results">No artists found</div>
              }
            <h2>Events</h2>
            { searchResults.events.length > 0 ?
              <div className="search-events-results">
                {searchResults.events.map(event => 
                  <ShowEventItem
                    key={event._id}
                    event={event}
                  />
                )}
              </div>
              : <div className="search-events-results">No events found</div>
            }
          </div>
        </div>
      </div>
    )
  } 
}

export default withRouter(SearchIndex);