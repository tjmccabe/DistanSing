import React from 'react';

class ArtistShow extends React.Component{
  // constructor(props){
  //   super(props)
  // }


  componentDidMount(){
    // debugger
    this.props.fetchArtist(this.props.match.params.id)
  }

  render(){
    const {artist} = this.props
    if (artist === null || artist === undefined || artist === false) return null;
    const temp_text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    return (
      <div>
        <div className='artist-show-container'>
          <img src={`${artist.imageurl}`} alt=""/>
          <div className='artist-bio'>
            <h1>{artist.artistname}</h1>
            <p>{temp_text}</p>
          </div>
        </div>
        <div className='artist-event-index-container'>
          <h1>{artist.artistname}'s upcoming events:</h1>

        </div>
      </div>
    );
  }


}

export default ArtistShow;