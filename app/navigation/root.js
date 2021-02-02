import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import PrivacyPolicy from '~/screens/Auth/PrivacyPolicy';
import { MainHeader, SimpleHeader } from '~/components/headers';
import { profile, navigators } from '~/navigation/routeNames';
import Settings from '~/screens/Main/Profile/Settings';
import { settingsData } from '~/config/settings';
import ProgressScreen from '~/screens/Auth/Progress';
import ChatRoom from '~/screens/Main/Chat/ChatRoom';

import Auth from './auth';
import MainTab from './main/mainTab';
import MainNav from './main/mainNav';

const Stack = createStackNavigator();

const ProfileSettings = (props) => <Settings hasSignOut data={settingsData} {...props} />;

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal" initialRouteName={navigators.main}>
    <Stack.Screen name={navigators.auth} component={Auth} />
    <Stack.Screen name={navigators.main} component={MainTab} />
    <Stack.Screen
      name={navigators.mainNav}
      component={MainNav}
      options={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
    <Stack.Screen
      name={profile.settings}
      component={ProfileSettings}
      options={{ title: 'Settings', headerShown: true, header: MainHeader }}
    />
    <Stack.Screen
      name={navigators.privacyPolicy}
      component={PrivacyPolicy}
      options={{
        headerShown: true,
        header: (props) => <MainHeader variant="auth" {...props} />,
        title: 'Privacy & Policy',
      }}
    />
    <Stack.Screen
      name={navigators.progress}
      component={ProgressScreen}
      options={{ headerShown: true, header: (props) => <SimpleHeader {...props} barStyle="dark" /> }}
    />
    <Stack.Screen
      name={navigators.replyRoom}
      component={ChatRoom}
      options={{ headerShown: true, header: MainHeader, headerLeft: false }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
