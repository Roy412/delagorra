import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SimpleHeader, MainHeader } from '~/components/headers';
import SignIn from '~/screens/Auth/SignIn';
import SetUpPassword from '~/screens/Auth/SetUpPassword';
import ForgotPassword from '~/screens/Auth/ForgotPassword';

import { auth } from '../routeNames';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={auth.setUpPassword}
    headerMode="screen"
    screenOptions={{ header: (props) => <MainHeader variant="auth" {...props} /> }}>
    <Stack.Screen name={auth.signIn} component={SignIn} options={{ header: SimpleHeader }} />
    <Stack.Screen name={auth.setUpPassword} component={SetUpPassword} options={{ title: 'Set Up New Password' }} />
    <Stack.Screen name={auth.forgot} component={ForgotPassword} options={{ title: 'Retrieve Password' }} />
  </Stack.Navigator>
);

export default AuthNavigator;
