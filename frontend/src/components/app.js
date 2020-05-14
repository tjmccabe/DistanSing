import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import EventShowContainer from "./events/event_show_container";
import Modal from './modal/modal';
import SplashContainer from './splash/splash-container';
import ArtistShowContainer from '../components/artists/artist_show_container'
import EventCreateContainer from './events/event_create_container';
import ArtistEditFormContainer from '../components/artists/artist_edit_form_container';
import StreamShow from '../components/streams/stream_show';
const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <StreamShow />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <Route path="/artists/:id/edit" component={ArtistEditFormContainer} />
      <Route path="/artists/:id" component={ArtistShowContainer} />
      <Route path="/events/create" component={EventCreateContainer} />
      <Route path="/events/:id" component={EventShowContainer} />
    </Switch>
  </div>
);

export default App;