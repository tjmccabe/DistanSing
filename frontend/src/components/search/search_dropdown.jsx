import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchDropdown extends React.Component {
  componentDidMount() {
    window.addEventListener('click', this.props.closeDropdown)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.closeDropdown)
  }

  formatDate(fullDate) {
    let date = new Date(fullDate);
    let splitDate = date.toString().split(' ');
    let dateString = splitDate[1] + ' ' + splitDate[3];
    return dateString;
  }

  showFiveResults(objects, string, name) {
    if (objects.length > 0) {
      return objects.slice(0, 5).map((object) =>
        <div
          key={object._id}
          className="search-dropdown-item"
          onClick={() => {
            this.props.closeDropdown();
            const searchBar = document.querySelector(".search-input");
            searchBar.value = '';
            this.props.history.push(`/${string}/${object._id}`);
          }}>
          <div className="search-item-content">
            <img className="search-item-image" src={object.imageurl} alt=""/>
            <div className="search-item-info">
              <div>{object[name]}</div>
              { string === "artists" ?
                <div>{object.genre}</div>
                : <div>{this.formatDate((object.date).toString())}</div>
              }
            </div>
          </div>
        </div>
      )
    } else {
      return <div className="no-results">No results</div>;
    }
  }

  render() {
    const { searchResults, fragment } = this.props;
    return (
      <div className="search-dropdown" onClick={e => e.stopPropagation()}>
        <div className="search-artists">Artist Results</div>
        {this.showFiveResults(searchResults.artists, 'artists', 'artistname')}
        <div className="search-events">Event Results</div>
        {this.showFiveResults(searchResults.events, 'events', 'name')}
        {searchResults.artists.length + searchResults.events.length >= 5 ?
          <div 
            className="index-search-link"
            onClick={() => {
              this.props.closeDropdown();
              this.props.history.push(`/search/${fragment}`);
            }}>
              See all search results
          </div>
          : null
        }
      </div>
    )
  }
}

export default withRouter(SearchDropdown);