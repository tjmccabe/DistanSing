import React from 'react'
import ImageUpload from '../image_upload/image_upload';

export default class ArtistEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistname: this.props.artist.artistname,
      bio: this.props.artist.artistname,
      imageurl: this.props.artist.imageurl,
      imageFile: null
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value })
  }

  setImageFile(imageFile) {
    this.setState({ imageFile })
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.prepareForm();
    this.props.updateArtist(data);
  }

  prepareForm() {
    const formData = new FormData();
    const { artistname, bio, imageFile } = this.state;
    if (imageFile) formData.append('imagefile', imageFile);
    formData.append('artistname', artistname);
    formData.append('bio', bio)
    return formData;
  }

  handleCancel() {
    this.setState({
      artistname: this.props.artist.artistname,
      bio: this.props.artist.artistname,
      imageurl: this.props.artist.imageurl,
      imageFile: null
    })
  }

  render() {
    const { artistname, bio } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <ImageUpload setImageFile={this.setImageFile} />
        </div>
        <div>
          <label>Artist/Band Name
            <input type="text" value={artistname} onChange={this.handleInput("artistname")}/>
          </label>
          <label>Bio
            <textarea value={bio} onChange={this.handleInput("bio")} placeholder="Tell the world about yourself"/>
          </label>
        </div>
        <button>Save Changes</button>
      </form>
    )
  }
}