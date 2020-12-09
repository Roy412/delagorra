import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainHeader } from '~/components/headers';
import Profile from '~/screens/Main/Profile';

import { main } from '../routeNames';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator initialRouteName={main.profile}>
    <Tab.Screen name={main.profile} component={Profile} options={{ header: MainHeader }} />
  </Tab.Navigator>
);

export default MainNavigator;
