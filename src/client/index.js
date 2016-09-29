import './index.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import AppStore from './stores/AppStore';

import App from './containers/App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="login" component={Login} onEnter={requireNotAuth}/>
        <Route path="signup" component={Signup} onEnter={requireNotAuth}/>
        <Route path="*" component={Dashboard}/>
    </Route>
</Router>, document.querySelector('#app'));
