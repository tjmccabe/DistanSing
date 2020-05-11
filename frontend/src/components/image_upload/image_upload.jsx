import React from 'react';
import axios from "axios";

// YOU MUST PASS AS PROPS A SET IMAGE FILE LOCAL STATE FUNCTION FOR THE FORM

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageUrl: ''
    }
    this.handleImageInput = this.handleImageInput.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleUploadClick() {
    document.querySelector('.hidden-upload').click();
  }

  handleImageInput(e) {
    const file = e.target.files[0];
    this.props.setImageFile({ imageFile: file })
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result })
    }
    fileReader.readAsDataURL(file);
  }

  // We won't need this once edit forms are implemented
  handleSubmitClick() {
    const data = new FormData();
    if (this.state.imageFile) {
      data.append('artistImage', this.state.imageFile, this.state.imageFile.name);
      axios.post('/api/artists/test', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      }).then(res => console.log(res))
    }
  }

  render() {
    return (
      <div>
        {this.state.imageUrl ?
          <img src={this.state.imageUrl} />
          : <div></div>
        }
        <input hidden className='hidden-upload' type="file" onChange={this.handleImageInput} />
        <button onClick={this.handleUploadClick} >📷 Upload Image</button>
      </div>
    )
  }
}