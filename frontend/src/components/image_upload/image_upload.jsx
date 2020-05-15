import React from 'react';

export default class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imageFile: null,
        imageUrl: this.props.imageurl,
      };
      this.handleImageInput = this.handleImageInput.bind(this);
      this.handleUploadClick = this.handleUploadClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.imageurl !== this.props.imageurl) {
        this.setState({ imageUrl: this.props.imageurl });
      }
    }
    handleUploadClick(e) {
      e.preventDefault();
      document.querySelector(".hidden-upload").click();
    }

    handleImageInput(e) {
      const file = e.target.files[0];
      this.props.setImageFile(file);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({
          imageFile: file,
          imageUrl: fileReader.result,
        });
      };
      fileReader.readAsDataURL(file);
    }

    render() {
      const classes = this.props.classNames
      return (
        <div className={classes[0]}>
          <img
            className={classes[1]}
            src={this.state.imageUrl}
            alt="distansing-img-upload"
            width="200"
            height="200"
          />
          <input
            hidden
            className="hidden-upload"
            type="file"
            onChange={this.handleImageInput}
          />
          <button 
            className={classes[2]}
            onClick={this.handleUploadClick}>
            Upload Image
          </button>
        </div>
      );
    }
  }
