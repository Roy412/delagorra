import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import AboutUs from '~/screens/Main/Profile/AboutUs';
import CheckVersion from '~/screens/Main/Profile/CheckVersion';
import BlockedUsers from '~/screens/Main/Profile/BlockedUsers';
import ProfileNotifications from '~/screens/Main/Profile/Notifications';
import { profile } from '~/navigation/routeNames';
import Settings from '~/screens/Main/Profile/Settings';
import { privacyData } from '~/config/settings';

const Stack = createStackNavigator();

const ProfilePrivacy = (props) => <Settings data={privacyData} {...props} />;

const MainNav = () => (
  <Stack.Navigator
    screenOptions={{ header: (props) => <MainHeader {...props} /> }}
    headerMode="screen"
    initialRouteName={profile.notifications}>
    <Stack.Screen name={profile.notifications} component={ProfileNotifications} options={{ title: 'Notifications' }} />
    <Stack.Screen name={profile.privacy} component={ProfilePrivacy} options={{ title: 'Privacy' }} />
    <Stack.Screen name={profile.blockedUsers} component={BlockedUsers} options={{ title: 'Blocked users' }} />
    <Stack.Screen name={profile.checkVersion} component={CheckVersion} options={{ title: 'Version' }} />
    <Stack.Screen name={profile.aboutUs} component={AboutUs} options={{ title: 'About Us' }} />
  </Stack.Navigator>
);

export default MainNav;
