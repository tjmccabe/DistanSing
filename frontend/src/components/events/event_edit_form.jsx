import React from 'react'
import ImageUpload from '../image_upload/image_upload';

export default class EventEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.event.name,
      description: this.props.event.description,
      imageurl: this.props.event.imageurl,
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
    this.props.updateEvent(data);
  }

  prepareForm() {
    const formData = new FormData();
    const { name, description, imagefile } = this.state;
    if (imagefile) formData.append('imagefile', imagefile);
    formData.append('id', this.props.event.id);
    formData.append('name', name);
    formData.append('bio', description);
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
    const { name, description, imageurl } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <ImageUpload setImageFile={this.setImageFile} imageurl={imageurl} />
        </div>
        <div>
          <label>Event Name
            <input type="text" value={name} onChange={this.handleInput("name")} />
          </label>
          <label>Description
            <textarea value={description} onChange={this.handleInput("description")} placeholder="What's going on?" />
          </label>
        </div>
        <button>Save Changes</button>
        <div onClick={this.handleCancel}>Cancel</div>
      </form>
    )
  }
}