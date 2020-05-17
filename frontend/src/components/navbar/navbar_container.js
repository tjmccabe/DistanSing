import { connect } from "react-redux";
import { logout } from "../../actions/user_session_actions";
import { fetchUser } from "../../actions/user_actions"
import { fetchArtist } from "../../actions/artist_actions"
import { openModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = (state, ownProps) => {
  const loggedInAsUser = (!!state.session.user);
  const loggedInAsArtist = (!!state.session.artist);
  const current = loggedInAsUser && state.entities.users[state.session.user.id] ? 
    state.entities.users[state.session.user.id] 
    : loggedInAsArtist && state.entities.artists[state.session.artist.id] ? 
      state.entities.artists[state.session.artist.id]
  : null;
  const artist = state.session.artist

  return {
    user: state.entities.user,
    loggedIn: (loggedInAsUser || loggedInAsArtist),
    loggedInAsUser,
    loggedInAsArtist,
    current,
    artist
}};

const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  logout: () => dispatch(logout()),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchArtist: (artistId) => dispatch(fetchArtist(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
