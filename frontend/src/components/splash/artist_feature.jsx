import React from 'react';

const ArtistFeatureItem = ({artist, linkToArtistShow}) => {
  const genre = artist.genre === "None" ? null : artist.genre

  const bkg = artist.imageurl ?
    { backgroundImage: `url(${artist.imageurl})` } :
    { backgroundColor: 'seashell' }

  return(
    <li
      className="artist-feature-item"
      style={bkg}
      onClick={ () => linkToArtistShow(artist) }
    >
      <div className="artist-feature-item-filter">
        <div>{artist.artistname}</div>
        <p>{genre}</p>
      </div>
    </li>
  )
}

const ArtistFeature = ({artists, linkToArtistShow}) => {

  return(
    <ul className="artist-feature">
      {artists.map(artist => (
        <ArtistFeatureItem artist={artist} key={`artist-${artist._id}`} linkToArtistShow={linkToArtistShow} />
      ))}
    </ul>
  )
}

export default ArtistFeature;