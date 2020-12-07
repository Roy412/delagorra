import React, { useEffect } from 'react';
import { Platform, LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components/native';

import NavigationWrapper from '~/navigation';
import theme from '~/utils/theme';

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

  return (
    <ThemeProvider theme={theme}>
      <NavigationWrapper />
    </ThemeProvider>
  );
};

export default App;
