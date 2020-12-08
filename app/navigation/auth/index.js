import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SimpleHeader, MainHeader } from '~/components/headers';
import SignIn from '~/screens/Auth/SignIn';
import SetUpPassword from '~/screens/Auth/SetUpPassword';
import PrivacyPolicy from '~/screens/Auth/PrivacyPolicy';

import { auth } from '../routeNames';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName={auth.privacyPolicy} headerMode="screen" screenOptions={{ header: MainHeader }}>
    <Stack.Screen name={auth.signIn} component={SignIn} options={{ header: SimpleHeader }} />
    <Stack.Screen name={auth.setUpPassword} component={SetUpPassword} options={{ title: 'Set Up New Password' }} />
    <Stack.Screen name={auth.privacyPolicy} component={PrivacyPolicy} options={{ title: 'Privacy & Policy' }} />
  </Stack.Navigator>
);

export default AuthNavigator;
