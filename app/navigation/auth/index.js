import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SimpleHeader } from '~/components/headers';
import SignIn from '~/screens/Auth/SignIn';

import { auth } from '../routeNames';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={auth.signIn} headerMode="screen" screenOptions={{ header: SimpleHeader }}>
    <Stack.Screen name={auth.signIn} component={SignIn} />
  </Stack.Navigator>
);

export default AuthNavigator;
