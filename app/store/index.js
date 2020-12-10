import { persistReducer } from 'redux-persist';

import reduxPersistConfig from '~/config/reduxPersist';

import rootSaga from './sagas';
import rootReducer from './reducers';

import createStore from './createStore';

export default () => {
  let reducer = rootReducer;

  if (reduxPersistConfig.active) {
    reducer = persistReducer(reduxPersistConfig.rootConfig, rootReducer);
  }

  let { store, sagasManager, sagaMiddleware } = createStore(reducer, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);

      const nextRootSaga = require('./sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(nextRootSaga);
      });
    });
  }

  return store;
};
