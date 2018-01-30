import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import reducers from './reducers';
import { routerMiddleware, routerReducer } from 'react-router-redux';

export const history = createHistory();

const middleware = routerMiddleware(history);

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    form: formReducer,
  }),
  applyMiddleware(middleware, logger)
);
