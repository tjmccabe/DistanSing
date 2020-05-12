import React from 'react';

class ArtistShow extends React.Component{
  // constructor(props){
  //   super(props)
  // }


  componentDidMount(){
    this.props.fetchArtists()
  }

  render(){
    const {artist} = this.props
    if (artist === null || artist === undefined || artist === false) return null;
    return (
      <div>
        <h1>{artist.artistname}</h1>
        <div>
          <p>Hello, I am danny</p>
          <p>{artist.bio}</p>
        </div>
      </div>
    );
  }


}

export default ArtistShow;