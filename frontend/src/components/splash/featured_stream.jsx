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
    const event = { name: "Something Cool - Non-Stop Party Time!", date: "2020-05-17T20:00:00.000Z", price: "25.00", imageurl: "https://distansing-dev.s3-us-west-1.amazonaws.com/big-concert.jpg"  };
    const artist = { artistname: "The Demo Artists" };
    return (
      <div
        className="featured-stream-container" 
        // onClick={() => this.props.history.push("/")}
      >
        <h1>Featured Live Stream</h1>
        <div className="featured-stream-content">
          <img 
            className="featured-stream-img"
            src={event.imageurl} 
            alt="featured-live-stream"/>
          <div className="featured-stream-text">
            <h2>{event.name}</h2>
            <h2>{artist.artistname}</h2>
            <span>${event.price}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(FeaturedStream);