import React from 'react';

export default class ArtistGenreField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomGenre: false
    }
    this.GENRES = ['None', 'Custom', 'Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Dancehall', 'Deep House', 'Disco', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Latin', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Reggaeton', 'Rock', 'Soundtrack', 'Techno', 'Trance', 'Trap', 'Triphop', 'World'];
    this.toggleCustomGenre = this.toggleCustomGenre.bind(this);
  }

  toggleCustomGenre(e) {
    e.preventDefault();
    if (e.target.value === 'Custom') {
      this.setState({ showCustomGenre: true })
    } else {
      this.setState({ showCustomGenre: false })
    }
    this.props.handleInput('genre')(e);
  }

  render() {
    const { genre, handleInput } = this.props;
    return (
      <label>Genre: 
        <select className="genre-select" defaultValue='None' onChange={this.toggleCustomGenre}>
          {this.GENRES.map((genre, idx) => (
            <option key={idx} value={genre}>{genre}</option>
          ))}
        </select>
        {this.state.showCustomGenre ?
            <input
              type="text"
              value={genre}
              onChange={handleInput('genre')} 
            />
          : ''
        }
      </label>
    )
  }
}