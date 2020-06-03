import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import EventShowContainer from "./events/event_show_container";
import Modal from './modal/modal';
import SplashContainer from './splash/splash-container';
import ArtistShowContainer from './artists/artist_show_container'
import EventCreateContainer from './events/event_create_container';
import ArtistEditFormContainer from './artists/artist_edit_form_container';
import UserShowContainer from "./users/user_show_container";
import SearchIndex from "./search/search_index";
import FeaturedShowContainer from "./events/featured_show_container";
import Footer from "./footer/footer";
import Favicon from "react-favicon";

const App = () => (
  <div>
    <Favicon url="http://icons.iconarchive.com/icons/sonya/swarm/128/Microphone-icon.png" />
    <Modal />
    <div id="app">
      <div>
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={SplashContainer} />
          <Route path="/artists/:id/edit" component={ArtistEditFormContainer} />
          <Route path="/artists/:id" component={ArtistShowContainer} />
          <Route path="/events/create" component={EventCreateContainer} />
          <Route path="/events/5ed7347c41adb24b89847ddd" component={FeaturedShowContainer}></Route>
          <Route path="/events/:id" component={EventShowContainer} />
          <Route path="/users/:id" component={UserShowContainer} />
          <Route path="/search/:fragment" component={SearchIndex} />
        </Switch>
      </div>
      <Footer />
    </div>
  </div>
);

export default App;