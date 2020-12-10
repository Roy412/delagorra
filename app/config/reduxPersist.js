import AsyncStorage from '@react-native-community/async-storage';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',

  rootConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: [],
    transforms: [],
  },

  dataConfig: {
    key: 'data',
    storage: AsyncStorage,
    whitelist: ['cache'],
  },
};

export default REDUX_PERSIST;
