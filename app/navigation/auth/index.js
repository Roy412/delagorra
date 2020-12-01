import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { auth } from '../routeNames';

import SignIn from 'screens/Auth/SignIn';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={auth.signIn}>
    <Stack.Screen name={auth.signIn} component={SignIn} />
  </Stack.Navigator>
);

export default AuthNavigator;
