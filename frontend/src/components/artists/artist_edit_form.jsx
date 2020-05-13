import React from 'react'
import ImageUpload from '../image_upload/image_upload';
import ArtistGenreField from './artist_genre_field';

export default class ArtistEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistname: this.props.artist.artistname,
      genre: this.props.artist.genre,
      bio: this.props.artist.bio,
      imageurl: this.props.artist.imageurl,
      imagefile: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imagefile) {
    this.setState({ imagefile })
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.prepareForm();
    this.props.updateArtist(data);
  }

  prepareForm() {
    const formData = new FormData();
    const { artistname, bio, imagefile } = this.state;
    if (imagefile) formData.append('imagefile', imagefile);
    formData.append('id', this.props.artist.id);
    formData.append('artistname', artistname);
    formData.append('bio', bio);
    return formData;
  }

  handleCancel() {
    this.setState({
      artistname: this.props.artist.artistname,
      bio: this.props.artist.bio,
      imageurl: this.props.artist.imageurl,
      imagefile: null
    })
  }

  render() {
    const { artistname, genre, bio, imageurl } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <ImageUpload setImageFile={this.setImageFile} imageurl={imageurl} />
        </div>
        <div>
          <label>Artist/Band Name
            <input type="text" value={artistname} onChange={this.handleInput("artistname")}/>
          </label>
          <ArtistGenreField genre={genre} handleInput={this.handleInput} />
          <label>Bio
            <textarea value={bio} onChange={this.handleInput("bio")} placeholder="Tell the world about yourself"/>
          </label>
        </div>
        <button>Save Changes</button>
        <div onClick={this.handleCancel}>Cancel</div>
      </form>
    )
  }
}