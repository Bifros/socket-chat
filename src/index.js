import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { store, history } from './store';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import Login from './components/Login';
import Home from './components/Home';
import ErrorPage from './components/Error';
import Lobby from './components/Lobby';

import './style.css';
import Room from './components/Room';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/room/:name" component={Room} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
