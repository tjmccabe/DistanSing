import React from 'react'
import ImageUpload from '../image_upload/image_upload';
import ArtistGenreField from './artist_genre_field';

export default class ArtistEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.artist;
    this.handleInput = this.handleInput.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImageFile = this.setImageFile.bind(this);
  }

  componentDidMount(){
    this.props.fetchArtist(this.props.match.params.id)
      .then(()=> this.setState({
        artistname: this.props.artist.artistname,
        genre: this.props.artist.genre,
        bio: this.props.artist.bio,
        imageurl: this.props.artist.imageurl,
        imagefile: null
    }))
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
    this.props.history.push(`/artists/${this.props.artist._id}`)
  }

  prepareForm() {
    const formData = new FormData();
    const { artistname, bio, imagefile } = this.state;
    if (imagefile) formData.append('imagefile', imagefile);
    formData.append('id', this.props.artist._id);
    formData.append('artistname', artistname);
    formData.append('bio', bio);
    return formData;
  }

  handleCancel() {
    this.props.history.goBack();
  }

  render() {
    if (!this.state) return null;
    const { artistname, genre, bio, imageurl } = this.state;
    const { artist } = this.props;
    if (!artist) return null; 
    return (
      <div className="artist-edit">
        <div
          className="background-test-form"
          style={{
            backgroundImage: `url("https://distansing-dev.s3-us-west-1.amazonaws.com/big-crowd.jpg")`
          }}
        >

          <div className="background-test-form-filter">
            <form 
              className="artist-edit-form"
              onSubmit={this.handleSubmit}
            >
              <div className="artist-edit-container">

                <div className="artist-edit-left">
                  <ImageUpload 
                    classNames={["image-upload-container", "image-upload", "image-upload-btn"]}
                    setImageFile={this.setImageFile} 
                    imageurl={imageurl}
                  />
                  <div className="artist-image-disclaimer">If no image is uploaded, this will<br />default to the above mask image</div>
                </div>

                <div className="artist-edit-right">
                  
                  <div className="artist-edit-name">       
                      {artistname} 
                  </div>
                  
                  <div>
                    <ArtistGenreField genre={genre} handleInput={this.handleInput} />
                  </div>

                    <textarea
                      className="artist-edit-bio" 
                      value={bio} 
                      onChange={this.handleInput("bio")} 
                      placeholder="Tell the world about yourself"
                    />

                  <div className="artist-edit-footer">
                    <button 
                      className="artist-edit-cancel"
                      onClick={this.handleCancel}
                    >Cancel</button>

                    <button
                      className="artist-edit-save"
                    >Save Changes</button>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}