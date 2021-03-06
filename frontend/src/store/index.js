import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import videoGameReducer from './videogame';
import partyReducer from './party';
import partyuserReducer from './partyuser';

const rootReducer = combineReducers({
  session: sessionReducer,
  videoGames: videoGameReducer,
  parties: partyReducer,
  partyuser: partyuserReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
