import { connect } from 'react-redux';
import { updateArtist, fetchArtist } from '../../actions/artist_actions';
import ArtistEditForm from './artist_edit_form';


const mapStateToProps = state => {
  const artist = state.entities.artists[state.session.artist.id] ? state.entities.artists[state.session.artist.id] : null;
  return {
    artist,
  }
}

const mapDispatchToProps = dispatch => ({
  updateArtist: artist => dispatch(updateArtist(artist)),
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEditForm);