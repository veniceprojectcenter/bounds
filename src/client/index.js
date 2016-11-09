import './index.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import AppStore from './stores/AppStore';

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marker from './containers/Marker';

let requireAuth = function(nextState, replace) {
  if (!AppStore.getState().isLoggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

let requireNotAuth = function(nextState, replace) {
  if (AppStore.getState().isLoggedIn) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
    <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="login" component={Login} onEnter={requireNotAuth}/>
        <Route path="signup" component={Signup} onEnter={requireNotAuth}/>
        <Route path="marker/:id" component={Marker} />
        <Route path="*" component={Dashboard}/>
    </Route>
</Router>, document.querySelector('#app'));
