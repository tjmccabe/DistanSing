import React from 'react';
import Carousel from './carousel.jsx';
import ArtistFeature from './artist_feature.jsx';
import Flickity from 'flickity';

class Splash extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

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
    let now = (new Date()).getTime()
    
    let soonStreams = this.props.events.filter(event => {
      const date = (new Date(event.date)).getTime();
      // return (date > now && date < (now + 86400000))
      return (date > now)
    })
    // debugger

    let shuffled = this.shuffle(soonStreams)

    return shuffled[0] ? <Carousel streams={shuffled} type="soon"/> : null
  }

  getTrendingArtists() {
    let shuffled = this.shuffle(this.props.artists).slice(0,6)

    return shuffled[0] ? <ArtistFeature artists={shuffled}/> : null
  }

  render() {
    const lives = this.getLiveStreams()
    const soons = this.getUpcomingStreams()
    const randos = this.getTrendingArtists()

    const LiveNow = lives ? (
      <div className="stream-carousel-container" id="live-now">
        <h3>LIVE</h3>
        {lives}
      </div>
    ) : null;

    const StreamingSoon = soons ? (
      <div className="stream-carousel-container" id="streaming-soon">
        <h3>Streaming Soon...</h3>
        {soons}
      </div>
    ) : null;

    const TrendingArtists = randos ? (
      <div id="trending-artists">
        <h3>Trending Artists</h3>
        {randos}
      </div>
    ): null;

    let soonCarousel = document.querySelector('.soon-carousel');
    new Flickity(soonCarousel, {
      draggable: false,
      wrapAround: true,
      cellAlign: 'center'
    });

    let liveCarousel = document.querySelector('.live-carousel');
    new Flickity(liveCarousel, {
      draggable: false,
      wrapAround: true,
      cellAlign: 'center'
    });

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