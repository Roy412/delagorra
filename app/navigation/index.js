import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '~/utils/theme';
import PrivacyPolicy from '~/screens/Auth/PrivacyPolicy';
import { MainHeader } from '~/components/headers';

import { auth, navigators } from './routeNames';
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

const NavigationWrapper = () => (
  <NavigationContainer theme={MyTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal" initialRouteName={navigators.auth}>
      <Stack.Screen name={navigators.auth} component={Auth} />
      <Stack.Screen name={navigators.main} component={Main} />
      <Stack.Screen
        name={auth.privacyPolicy}
        component={PrivacyPolicy}
        options={{ headerShown: true, header: MainHeader, title: 'Privacy & Policy' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default NavigationWrapper;
