import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'react-native';

import { Colors } from '~/utils/theme';
import PrivacyPolicy from '~/screens/Auth/PrivacyPolicy';
import ProgressScreen from '~/screens/Auth/Progress';
import { MainHeader, SimpleHeader } from '~/components/headers';
import { isRestored as isRestoredSelector } from '~/store/selectors/app';
import { AppCreators } from '~/store/actions/app';

import { navigators } from './routeNames';
import Auth from './auth';
import Main from './main';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const NavigationWrapper = () => {
  const isRestored = useSelector(isRestoredSelector);
  const [appState, setAppState] = useState(AppState.currentState);
  const dispatch = useDispatch();

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      dispatch(AppCreators.refresh());
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  if (!isRestored) {
    return <ProgressScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        mode="modal"
        initialRouteName={navigators.main}>
        <Stack.Screen name={navigators.auth} component={Auth} />
        <Stack.Screen name={navigators.main} component={Main} />
        <Stack.Screen
          name={navigators.privacyPolicy}
          component={PrivacyPolicy}
          options={{
            headerShown: true,
            header: (props) => <MainHeader variant="auth" {...props} />,
            title: 'Privacy & Policy',
          }}
        />
        <Stack.Screen
          name={navigators.progress}
          component={ProgressScreen}
          options={{ headerShown: true, header: SimpleHeader }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationWrapper;
