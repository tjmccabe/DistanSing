import { connect } from 'react-redux';
import { updateArtist } from '../../actions/artist_actions';
import ArtistEditForm from './song_upload_form';

const mapStateToProps = state => ({
  artist: state.session.artist
})

const mapDispatchToProps = dispatch => ({
  updateArtist: artist => dispatch(updateArtist(artist))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEditForm);