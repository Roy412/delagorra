import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'react-native';

import { Colors } from '~/utils/theme';
import PrivacyPolicy from '~/screens/Auth/PrivacyPolicy';
import ProgressScreen from '~/screens/Auth/Progress';
import { MainHeader, SimpleHeader } from '~/components/headers';
import { Toast } from '~/components/ui';
import { isRehydrated as isRehydratedSelector } from '~/store/selectors/app';
import { AppCreators } from '~/store/actions/app';
import Settings from '~/screens/Main/Profile/Settings';
import { profile, navigators } from '~/navigation/routeNames';
import { settingsData } from '~/config/settings';

import Auth from './auth';
import MainTab from './main/mainTab';
import MainNav from './main/mainNav';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const ProfileSettings = (props) => <Settings hasSignOut data={settingsData} {...props} />;

const NavigationWrapper = () => {
  const isRehydrated = useSelector(isRehydratedSelector);
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

  if (!isRehydrated) {
    return <ProgressScreen />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        mode="modal"
        initialRouteName={navigators.main}>
        <Stack.Screen name={navigators.auth} component={Auth} />
        <Stack.Screen name={navigators.main} component={MainTab} />
        <Stack.Screen
          name={navigators.mainNav}
          component={MainNav}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name={profile.settings}
          component={ProfileSettings}
          options={{ title: 'Settings', headerShown: true, header: MainHeader }}
        />
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
      <Toast />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
