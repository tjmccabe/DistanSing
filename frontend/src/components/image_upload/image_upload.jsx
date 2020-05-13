import React from 'react';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageUrl: this.props.imageurl
    }
    this.handleImageInput = this.handleImageInput.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  handleUploadClick(e) {
    e.preventDefault();
    document.querySelector('.hidden-upload').click();
  }

  handleImageInput(e) {
    const file = e.target.files[0];
    this.props.setImageFile(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result })
    }
    fileReader.readAsDataURL(file);
  }

  render() {
    return (
      <div className='image-upload-container'>
        <img className='image-upload' src={this.state.imageUrl} alt='distansing-img-upload' />
        <input hidden className='hidden-upload' type="file" onChange={this.handleImageInput} />
        <button className='image-upload-btn' onClick={this.handleUploadClick}>Upload Image</button>
      </div>
    )
  }
}