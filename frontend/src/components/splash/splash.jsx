import React from 'react';
import EventsIndexContainer from "../events/events_index_container";


class Splash extends React.Component {
  constructor(props) {
    super(props)
  }

  

  render() {

    const LiveNow = null
    const StreamingSoon = null
    const TrendingArtists = null

    return(
      <div className='splash'>
        <div className="splash-header">
          <h2 className="site-heading">
            Welcome To DistanSing, where we're all only 6 beats apart
          </h2>
          <h2 className="site-heading">
            Check out what's happening!
          </h2>
        </div>
        <div className="splash-body">
          <div className="event-category-container">
            <div id="live-now">
              <h3>LIVE</h3>
              {LiveNow}
            </div>
            <div id="streaming-soon">
              <h3>Streaming Soon...</h3>
              {StreamingSoon}
            </div>
          </div>
          <div className="random-artist-container">
            <h3>Trending Artists</h3>
            <div>
              {TrendingArtists}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Splash;