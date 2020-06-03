import { connect } from "react-redux";
import FeaturedEventShow from "./featured_event_show";
import { updateUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";

// date: '2020-06-01T04:00:00.000Z',

const mapStateToProps = (state, ownProps) => {
  let artist = { _id: '5ed72c0810435f4933a2a981', id: '5ed72c0810435f4933a2a981', artistname: 'DJ Sanitizzy', imageurl: 'https://distansing-dev.s3-us-west-1.amazonaws.com/dj_sanitizzy.jpg', email: 'djs@gmail.com', password: 'password', bio: 'delivering squeaky clean beats to the Bay Area, usually have more ethanol in my system than a bottle of rubbing alcohol' }
  let event = { id: '5ed744590740f350e8ccb2e0', name: 'Inside Lands Music Festival!', description: "BAY AREA WHAT'S GOOD Even though we won't be able to meet up at Golden Gate Park this year, that doesn't mean the party has to stop! Inside Lands is our answer to 2020, and that answer is gonna be loud and proud! We'll be hosting this event from inside Glen's bedroom, and it'll be going on all of 2020! So whenever you're feeling down and cooped up, swing on by and have fun with other concertgoers at Inside Lands, presented by DistanSing!", date: new Date(new Date().getTime() + 10000), artist: '5ed72c0810435f4933a2a981', imageurl: 'https://distansing-dev.s3-us-west-1.amazonaws.com/inside_lands_banner.jpg', price: 0, streaming: false, over: false }
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
