import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import EventShowContainer from "./events/event_show_container";
import Modal from './modal/modal';
import Splash from './splash/splash';
import ArtistShowContainer from '../components/artists/artist_show_container'
import CreateEventContainer from '../components/events/event_create_form_container'
import ArtistEditFormContainer from '../components/artists/artist_edit_form_container'
const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route path="/artists/:id/edit" component={ArtistEditFormContainer} />
      <Route path="/artists/:id" component={ArtistShowContainer} />
      <Route path="/events/:id" component={EventShowContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;