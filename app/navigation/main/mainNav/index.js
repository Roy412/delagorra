import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import AboutUs from '~/screens/Main/Profile/AboutUs';
import { profile } from '~/navigation/routeNames';

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator
    screenOptions={{ header: (props) => <MainHeader {...props} /> }}
    headerMode="screen"
    initialRouteName={profile.aboutUs}>
    <Stack.Screen name={profile.aboutUs} component={AboutUs} options={{ title: 'About Us' }} />
  </Stack.Navigator>
);

export default MainNav;
