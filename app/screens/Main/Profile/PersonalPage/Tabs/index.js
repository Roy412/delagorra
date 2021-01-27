import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { personalPage } from '~/navigation/routeNames';
import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const Tab = createMaterialTopTabNavigator();

const Tabs = ({ profileId }) => (
  <Tab.Navigator
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: Colors.pink,
      },
      activeTintColor: Colors.veryDarkGray,
      inactiveTintColor: 'rgba(19,19,19,0.5)',
      labelStyle: {
        textTransform: 'capitalize',
        fontFamily: 'SFUIDisplay-Medium',
        fontSize: 14,
      },
      style: { backgroundColor: 'white' },
    }}>
    <Tab.Screen name={personalPage.posts} options={{ title: 'Posts' }}>
      {(props) => <Styled.PostList profileId={profileId} {...props} />}
    </Tab.Screen>
    <Tab.Screen name={personalPage.comments} options={{ title: 'Comments' }}>
      {(props) => <Styled.PostList profileId={profileId} {...props} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default Tabs;
