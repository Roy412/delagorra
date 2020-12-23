import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import ProfileSettings from '~/screens/Main/Profile/Settings';
import { profile } from '~/navigation/routeNames';

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator
    screenOptions={{ header: (props) => <MainHeader {...props} /> }}
    headerMode="screen"
    initialRouteName={profile.settings}>
    <Stack.Screen name={profile.settings} component={ProfileSettings} options={{ title: 'Settings' }} />
  </Stack.Navigator>
);

export default MainNav;
