import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '~/utils/theme';

import { navigators } from './routeNames';
import Auth from './auth';

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
    </Stack.Navigator>
  </NavigationContainer>
);

export default NavigationWrapper;
