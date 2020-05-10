import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import Splash from './splash/splash';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;