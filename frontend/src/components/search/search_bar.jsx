import React from 'react';
import axios from "axios";

export default class SearchBar extends React.Component {
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


  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInput} placeholder="Search"/>
        { this.state.searchResults && (this.state.searchResults.artists || this.state.searchResults.events) ?  
          <div>
            {this.state.searchResults.artists.map(artist => 
              (<div key={artist._id}>{artist.artistname}</div>)  
            )}
            {this.state.searchResults.events.map(event => 
              (<div key={event._id}>{event.name}</div>) 
            )}
          </div>
          : null
        }
      </div>
    )
  }
}