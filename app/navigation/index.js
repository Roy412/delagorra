import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigators } from './routeNames';

import Auth from './auth';

const Stack = createStackNavigator();

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={navigators.auth} component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationWrapper;
