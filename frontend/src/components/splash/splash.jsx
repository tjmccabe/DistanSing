import React from 'react';
import Carousel from './carousel.jsx';
import ArtistFeature from './artist_feature.jsx';
import Flickity from 'flickity';

class Splash extends React.Component {

  componentDidMount() {
    this.props.fetchEvents()
    this.props.fetchArtists()
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getLiveStreams() {
    if (!this.props.events) return null;
    let now = (new Date()).getTime()

    let liveStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      // return (date < now && date > (now-3600000))
      return (date > now)
      // maybe refactor if streaming gives us more info about live streams
    })

    let shuffled = this.shuffle(liveStreams)

    return shuffled[0] ? <Carousel streams={shuffled} type="live"/> : null
  }

  getUpcomingStreams() {
    if (!this.props.events) return null;
    let now = (new Date()).getTime()
    
    let soonStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      // return (date > now && date < (now + 86400000))
      return (date > now)
    })

    let shuffled = this.shuffle(soonStreams)

    return shuffled[0] ? <Carousel streams={shuffled} type="soon"/> : null
  }

  getTrendingArtists() {
    if (!this.props.artists) return null;
    let shuffled = this.shuffle(this.props.artists).slice(0,6)

    return shuffled[0] ? <ArtistFeature artists={shuffled}/> : null
  }

  render() {
    this.lives = this.lives ? this.lives : this.getLiveStreams()
    this.soons = this.soons ? this.soons : this.getUpcomingStreams()
    this.randos = this.randos ? this.randos : this.getTrendingArtists()

    const LiveNow = this.lives ? (
      <div className="stream-carousel-container" id="live-now">
        <h3>LIVE</h3>
        {this.lives}
      </div>
    ) : null;

    const StreamingSoon = this.soons ? (
      <div className="stream-carousel-container" id="streaming-soon">
        <h3>Streaming Soon...</h3>
        {this.soons}
      </div>
    ) : null;

    const TrendingArtists = this.randos ? (
      <div id="trending-artists">
        <h3>Trending Artists</h3>
        {this.randos}
      </div>
    ): null;

    let soony = document.getElementById('soon-carousel')
    let livey = document.getElementById('live-carousel')

    if (soony) {
    new Flickity(soony, {
      draggable: false,
      wrapAround: true,
      groupCells: 4
    })};

    if (livey) {
      new Flickity(livey, {
        draggable: false,
        wrapAround: true,
        groupCells: 4
      })};

      const Placeholder = (LiveNow || StreamingSoon) ? null : (
        <div>Looks like it's pretty quiet around here.<br/> Sign up as an artist and start streaming today!</div>
      )
      
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
            {Placeholder}
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