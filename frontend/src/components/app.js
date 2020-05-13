import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import EventShowContainer from "./events/event_show_container";
import Modal from './modal/modal';
import Splash from './splash/splash';
import ArtistShowContainer from '../components/artists/artist_show_container'
import EventCreateContainer from './events/event_create_container';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route path="/artists/:id" component={ArtistShowContainer} />
      <Route path="/events/create" component={EventCreateContainer} />
      <Route path="/events/:id" component={EventShowContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;