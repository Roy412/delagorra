import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainHeader } from '~/components/headers';
import { profileIcon, homeIcon, bellIcon, } from '~/resources';
import { Colors, Metrics } from '~/utils/theme';

import { main } from '../routeNames';
import TabBarItem from './TabBarItem';
import Profile from './profile';
import Home from '~/screens/Main/Home';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName={main.profile}
    tabBarOptions={{
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.gainsBoro,
      tabStyle: { backgroundColor: Colors.white, height: Metrics.mainTabBarHeight },
      showLabel: false,
    }}
    backBehavior="none">
    <Tab.Screen
      name={main.home}
      component={Home}
      options={{
        header: MainHeader,
        tabBarIcon: (params) => <TabBarItem source={homeIcon} tintColor={params.color} />,
      }}
    />

    <Tab.Screen
      name={main.profile}
      component={Profile}
      options={{
        header: MainHeader,
        tabBarIcon: (params) => <TabBarItem source={profileIcon} tintColor={params.color} />,
      }}
    />
  </Tab.Navigator>
);

export default MainNavigator;
