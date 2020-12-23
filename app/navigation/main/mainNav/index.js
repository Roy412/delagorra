import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import AboutUs from '~/screens/Main/Profile/AboutUs';
import CheckVersion from '~/screens/Main/Profile/CheckVersion';
import { profile } from '~/navigation/routeNames';

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator
    screenOptions={{ header: (props) => <MainHeader {...props} /> }}
    headerMode="screen"
    initialRouteName={profile.checkVersion}>
    <Stack.Screen name={profile.checkVersion} component={CheckVersion} options={{ title: 'Version' }} />
    <Stack.Screen name={profile.aboutUs} component={AboutUs} options={{ title: 'About Us' }} />
  </Stack.Navigator>
);

export default MainNav;
