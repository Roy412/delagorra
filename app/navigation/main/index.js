import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainHeader } from '~/components/headers';
import Profile from '~/screens/Main/Profile';
import { profileIcon } from '~/resources';
import { Colors, Metrics } from '~/utils/theme';

import { main } from '../routeNames';
import TabBarItem from './TabBarItem';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName={main.profile}
    tabBarOptions={{
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.veryDarkGray,
      tabStyle: { backgroundColor: Colors.white, height: Metrics.mainTabBarHeight },
      showLabel: false,
    }}>
    <Tab.Screen
      name={main.profile}
      component={Profile}
      options={{ header: MainHeader, tabBarIcon: (params) => <TabBarItem source={profileIcon} tintColor={params.color} /> }}
    />
  </Tab.Navigator>
);

export default MainNavigator;
