import React from 'react';
import axios from "axios";
import SearchDropdown from './search_dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      openDropdown: false,
      fragment: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  closeDropdown() {
    this.setState({ openDropdown: false });
  }

  handleInput(e) {
    if (e.target.value === '') {
      this.setState({ openDropdown: false });
    } else {
      this.search(e.target.value)
        .then(this.setState({ openDropdown: true }))
    }
    this.setState({ fragment: e.target.value })
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

  render() {
    const { fragment, searchResults, openDropdown } = this.state;
    return (
      <div className="search-bar-container">
        <FontAwesomeIcon 
          icon={faSearch} 
          className="search-icon" />
        <input 
          className="search-input"
          type="text" 
          onChange={this.handleInput} 
          placeholder="Search" />
        { openDropdown && searchResults ?  
          <SearchDropdown 
            fragment={fragment}
            closeDropdown={this.closeDropdown} 
            searchResults={searchResults} />
          : null
        }
      </div>
    )
  }
}