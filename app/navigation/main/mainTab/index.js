import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { profileIcon, homeIcon } from '~/resources';
import { Colors, Metrics } from '~/utils/theme';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { navigators} from '~/navigation/routeNames';

import { main } from '../../routeNames';
import TabBarItem from './TabBarItem';
import Profile from './profile';
import Home from './home';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const tabPress = (e, navigation) => {
    if (isAuthenticated) {
      return;
    }

    e.preventDefault();
    navigation.navigate(navigators.auth);
  };

  return (
    <Tab.Navigator
      initialRouteName={main.home}
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
          tabBarIcon: (params) => <TabBarItem source={homeIcon} tintColor={params.color} />,
        }}
      />

      <Tab.Screen
        name={main.profile}
        component={Profile}
        options={{
          tabBarIcon: (params) => <TabBarItem source={profileIcon} tintColor={params.color} />,
        }}
        listeners={({ navigation, route }) => ({ tabPress: (e) => tabPress(e, navigation) })}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
