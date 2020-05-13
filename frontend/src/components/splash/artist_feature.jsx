import React from 'react';

const ArtistFeatureItem = ({artist}) => {
  const genre = artist.genre === "None" ? null : artist.genre

  const bkg = artist.imageurl ?
    { backgroundImage: `url(${artist.imageurl})` } :
    // {background: 'transparent'}
    { backgroundColor: 'seashell' }

  return(
    <li
      className="artist-feature-item"
      style={bkg}
    >
      <div className="artist-feature-item-filter">
        <div>{artist.artistname}</div>
        <div>{genre}</div>
      </div>
    </li>
  )
}


const ArtistFeature = ({artists}) => {

  return(
    <ul className="artist-feature">
      {artists.map(artist => (
        <ArtistFeatureItem artist={artist} key={`artist-${artist._id}`} />
      ))}
    </ul>
  )
}

export default ArtistFeature;