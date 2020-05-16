import React from 'react';
import axios from "axios";
import SearchDropdown from './search_dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      openDropdown: false,
      fragment: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
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

  handleEnter(e) {
    if (e.key === 'Enter') {
      if (this.props.history.location.pathname.slice(0, 7) === '/search') {
        this.handleSearchSubmit();
        window.location.reload();
      } else {
        this.handleSearchSubmit();
      }    
    }
  }

  handleSearchSubmit() {
    this.closeDropdown();
    this.props.history.push(`/search/${this.state.fragment}`);
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
          onKeyPress={this.handleEnter}
          placeholder="Search Artists / Events" />
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

export default withRouter(SearchBar);