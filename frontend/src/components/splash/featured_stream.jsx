import React from 'react';
import { withRouter } from 'react-router-dom';

class FeaturedStream extends React.Component {

  formatDate(fullDate) {
    let date = new Date(fullDate);
    let splitDate = date.toString().split(' ');
    let dateString = splitDate[1] + ' ' + splitDate[3];
    return dateString;
  }

  render() {
    const event = { id: '5ed7347c41adb24b89847ddd', name: "Inside Lands Music Festival!", date: "2020-05-17T20:00:00.000Z", imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/inside_lands_banner.jpg" };
    const artist = { artistname: "DJ Sanitizzy" };
    return (
      <div
        className="featured-stream-container"
      >
        <h1>Featured Live Stream</h1>
        <div className="featured-parent">
          <div 
            className="featured-stream-content"
            onClick={() => this.props.history.push(`/events/${event.id}`)}
          >
            <img
              className="featured-stream-img"
              src={event.imageurl}
              alt="featured-live-stream"
            />
            <div className="featured-stream-text">
              <h2>{event.name}</h2>
              <div className="featured-stream-text-right">
                <span>Free</span>
                <h2>{artist.artistname}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FeaturedStream);