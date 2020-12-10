import ReduxPersist from '~/config/reduxPersist';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore } from 'redux-persist';

import { AppCreators } from '~/store/actions/app';

const updateReducers = (store) => {
  const { reducerVersion } = ReduxPersist;
  const startup = () => store.dispatch(AppCreators.startup());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then((localVersion) => {
      if (localVersion !== reducerVersion) {
        console.log({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion,
          },
          preview: 'Reducer Version Change Detected',
          important: true,
        });
        // Purge store
        persistStore(store, null, startup).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null, startup);
      }
    })
    .catch(() => {
      persistStore(store, null, startup);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default { updateReducers };
