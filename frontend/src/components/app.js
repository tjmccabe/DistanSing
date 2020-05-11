import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import EventShowContainer from "./events/event_show_container";
import Modal from './modal/modal';
import Splash from './splash/splash';

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      <Route path="/events/:id" component={EventShowContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;