import Promise from 'es6-promise';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from './app.jsx';
import designerApp from './reducers';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

import bindCheckAuth from './bindCheckAuth';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)( createStore );

const store = createStoreWithMiddleware( designerApp );

const requireAuth = bindCheckAuth( store, ( nextState, transition ) => {
  console.log( 'Not authorized handler', 'NextState: ', nextState, 'Replace: ', transition );
  return transition(
    '/login',
    {
      pathname: '/login',
      nextPathname: nextState.location.pathname
    }
  );
});
//
render( (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} path='/' name='Designer'>
        <IndexRoute component={HomePage} name='Home' onEnter={requireAuth}/>
        <Route component={LoginPage} name='LoginPage' path='/login'/>
      </Route>
    </Router>
  </Provider>
), document.getElementById( 'app' ) );
