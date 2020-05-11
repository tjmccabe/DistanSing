import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import Modal from './modal/modal';
import Splash from './splash/splash';
import ArtistShowContainer from '../components/artists/artist_show_container'

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route path="/artists/:id" component={ArtistShowContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;