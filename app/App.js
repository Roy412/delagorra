import React, { useEffect } from 'react';
import { Platform, LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';

import NavigationWrapper from '~/navigation';
import theme from '~/utils/theme';
import createStore from '~/store';

LogBox.ignoreLogs(['componentWillReceiveProps has been renamed']);

const App = () => {
  const store = createStore();

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationWrapper />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
