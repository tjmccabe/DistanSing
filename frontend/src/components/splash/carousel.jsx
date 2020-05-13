import React from 'react';
import {connect} from 'react-redux'

const CarouselItem = ({stream, artists}) => {
  const price = stream.price === 0 ? "FREE" : `Price: $${stream.price}`

  const bkg = stream.imageurl ?
    {backgroundImage: `url(${stream.imageurl})`} :
    // {background: 'transparent'}
    {backgroundColor: 'seashell'}

  const artistName = artists[stream.artist] ?
    <div>{artists[stream.artist].artistname}</div> :
    null

  const date = new Date(stream.date)
  const hr = date.getHours()
  const min = date.getMinutes()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const fullDate = date.getTime() < (new Date()).getTime() ? (
    `Started at ${hr}:${("0" + min).slice(-2)}`
  ) : (
      `${month}/${day} at ${hr}:${("0" + min).slice(-2)}`
  )

  return(
    <li
      className="carousel-item"
      style={bkg}
    >
      <div className="carousel-item-filter">
        <div>{stream.name}</div>
        {artistName}
        <div>{fullDate}</div>
        <div>{price}</div>
      </div>
    </li>
  )
}

const mSTP = (state, ownProps) => ({
  artists: state.entities.artists
});

const CarouselItemContainer = connect(mSTP)(CarouselItem);

const CarouselPane = ({ pane, type }) => {

  return (
    <ul className="carousel-pane carousel-cell">
      {pane.map(stream => (
        <CarouselItemContainer stream={stream} key={`stream-${type}-${stream._id}`} />
      ))}
    </ul>
  )
}

const Carousel = ({ streams, type }) => {
  function chunk(arr, len) {
    let chunks = [],
      i = 0,
      n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  }

  const panes = chunk(streams, 4)

  return(
    <ol className={`stream-carousel ${type}-carousel`}>
      {panes.map((pane, idx) => (
        <CarouselPane pane={pane} type={type} key={`stream-${type}-${idx}`} />
      ))}
    </ol>
  )
}

export default Carousel;