import { connect } from 'react-redux';
import { updateArtist } from '../../actions/artist_actions';
import ArtistEditForm from './artist_edit_form';

const mapStateToProps = state => ({
  artist: state.entities.artists[state.session.artist.id]
})

const mapDispatchToProps = dispatch => ({
  updateArtist: artist => dispatch(updateArtist(artist))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEditForm);