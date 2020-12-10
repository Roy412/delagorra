import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import ReduxPersist from '~/config/reduxPersist';
import Rehydration from './rehydration';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor: null });
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store);
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga, store);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
