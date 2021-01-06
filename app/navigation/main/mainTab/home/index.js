import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SimpleHeader } from '~/components/headers';
import { home } from '~/navigation/routeNames';
import Home from '~/screens/Main/Home/Main';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ header: (props) => <SimpleHeader bg="white" {...props} /> }} headerMode="screen" initialRouteName={home.main}>
    <Stack.Screen name={home.main} component={Home} />
  </Stack.Navigator>
);

export default HomeNavigator;
