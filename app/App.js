import React, { useEffect } from 'react';
import { Platform, LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import NavigationWrapper from '~/navigation';

LogBox.ignoreLogs(['componentWillReceiveProps has been renamed']);

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    } else {
      SplashScreen.hide();
    }
  }, []);

  return <NavigationWrapper />;
};

export default App;
