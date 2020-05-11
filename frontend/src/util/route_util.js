import React from 'react';
import {
  connect
} from 'react-redux';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({
  component: Component,
  path,
  loggedIn,
  exact
}) => (<
  Route path={
    path
  }
  exact={
    exact
  }
  render={
    (props) => (
      !loggedIn ? (<
        Component {
        ...props
        }
      />
      ) : (
          <
            Redirect to="/" />
        )
    )
  }
/>
  );

const Protected = ({
  component: Component,
  loggedIn,
  ...rest
}) => (<
  Route {
  ...rest
  }
  render={
    props =>
      loggedIn ? (<
        Component {
        ...props
        }
      />
      ) : (
          <
            Redirect to="/login" />
        )
  }
/>
  );

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated //needs to change with updated reducers ? maybe not?
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));