import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import { notification } from '~/navigation/routeNames';
import Notification from '~/screens/Main/Notification';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ header: MainHeader }} headerMode="screen" initialRouteName={notification.list}>
    <Stack.Screen name={notification.list} component={Notification} options={{ title: 'Notifications' }} />
  </Stack.Navigator>
);

export default HomeNavigator;
