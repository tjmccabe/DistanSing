import { connect } from "react-redux";
import FeaturedEventShow from "./featured_event_show";
import { updateUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";

// date: '2020-06-01T04:00:00.000Z',

const mapStateToProps = (state, ownProps) => {
  let artist = { _id: '5ed6d81d55b99d3a686c0e4c', id: '5ed6d81d55b99d3a686c0e4c', artistname: 'DJ Sanitizzy', imageurl: 'https://distansing-dev.s3-us-west-1.amazonaws.com/default_artist_image_mask_on.jpg', email: 'djs@gmail.com', password: 'password' }
  let event = { id: '5ed6fb0a53f31b4146dda754', name: 'Inside Lands Music Festival', description: '', date: new Date(new Date().getTime() + 10000), artist: '5ed6d81d55b99d3a686c0e4c', imageurl: 'https://distansing-dev.s3-us-west-1.amazonaws.com/inside_lands_banner.jpg', price: 0, streaming: false, over: false }
  let currentId = state.session.artist ? state.session.artist._id : state.session.user ? state.session.user._id : null;
  let currentUserPurchase = state.session.user ? state.entities.users[state.session.user._id] : null
  let loggedInAsArtist = !!state.session.artist
  const startingSoon = true;
  return {
    artist, 
    event,
    currentId,
    currentUserPurchase,
    startingSoon,
    loggedInAsArtist
  }
};


const mapDispatchToProps = (dispatch) => ({
  updateUser: user => dispatch(updateUser(user)),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FeaturedEventShow);
