import AsyncStorage from '@react-native-community/async-storage';

import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',

  rootConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['session', 'chat', 'notification'],
    stateReconciler: seamlessImmutableReconciler,
  },

  dataConfig: {
    key: 'data',
    storage: AsyncStorage,
    whitelist: ['cache'],
  },
};

export default REDUX_PERSIST;
