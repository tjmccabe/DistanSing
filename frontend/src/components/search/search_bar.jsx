import React from 'react';
import axios from "axios";
import { faSearch, faSearchDollar, faSearchPlus, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    if (e.target.value === '') {
      this.setState({ searchResults: null })
    } else {
      this.search(e.target.value);
    }
  }

  searchArtists = fragment => {
    return axios.post("/api/artists/search", { fragment })
  }

  searchEvents = fragment => {
    return axios.post("/api/events/search", { fragment })
  }

  search = async function (fragment) {
    let results = {};
    this.searchArtists(fragment)
      .then(res => {
        results.artists = res.data;
        this.searchEvents(fragment)
          .then(res => {
            results.events = res.data;
            this.setState({ searchResults: results })
          })
      })
  }

  showFiveResults(objects, string, name) {
    if (objects.length > 0) {
      return objects.slice(0, 5).map((object) => 
        <div
          key={object._id}
          className="search-dropdown-item"
          onClick={() => this.props.history.push(`/${string}/${object._id}`)}>
          {object[name]}
        </div>
      )
    } else {
      return <div>No results</div>;
    }
  }

  render() {
    const { searchResults } = this.state;
    return (
      <div className="search-bar-container">
        <input 
          className="search-input"
          type="text" 
          onChange={this.handleInput} 
          placeholder="Search" />
        { searchResults && (searchResults.artists || searchResults.events) ?  
          <div className="search-dropdown">
            <div className="search-artists">Artist Results</div>
            {this.showFiveResults(searchResults.artists, 'artists', 'artistname')}
            { searchResults.artists.length > 5 ? 
              <div className="index-search-link">See all artist results</div>
              : null
            }
            <div className="search-events">Event Results</div>
            {this.showFiveResults(searchResults.events, 'events', 'name')}
            { searchResults.events.length > 5 ? 
              <div className="index-search-link">See all event results</div>
              : null
            }
          </div>
          : null
        }
      </div>
    )
  }
}

export default withRouter(SearchBar);