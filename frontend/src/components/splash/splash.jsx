import React from 'react';

class Splash extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchEvents()
    this.props.fetchArtists()
  }

  eventCarousel(events) {

  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getLiveStreams() {
    let now = (new Date()).getTime()

    let liveStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      return (date < now && date > (now-3600000))
      // maybe refactor if streaming gives us more info about live streams
    })

    return this.eventCarousel(this.shuffle(liveStreams))
  }

  getUpcomingStreams() {
    let now = (new Date()).getTime()

    let soonStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      return (date > now && date < (now + 86400000))
    })

    return this.eventCarousel(this.shuffle(soonStreams))
  }

  getTrendingArtists() {

  }

  render() {
    const lives = this.getLiveStreams()
    const soons = this.getUpcomingStreams()
    const randos = this.getTrendingArtists()

    const LiveNow = lives && lives[0] ? (
      <div id="live-now">
        <h3>LIVE</h3>
        {lives}
      </div>
    ) : null;

    const StreamingSoon = soons && soons[0] ? (
      <div id="streaming-soon">
        <h3>Streaming Soon...</h3>
        {soons}
      </div>
    ) : null;

    const TrendingArtists = randos && randos[0] ? (
      <div>
        <h3>Trending Artists</h3>
        {randos}
      </div>
    ): null;

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
            {LiveNow}
            {StreamingSoon}
          </div>
          <div className="random-artist-container">
            {TrendingArtists}
          </div>
        </div>
      </div>
    )
  }
}

export default Splash;