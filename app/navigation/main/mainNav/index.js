import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainHeader } from '~/components/headers';
import { privacyData } from '~/config/settings';
import AboutUs from '~/screens/Main/Profile/AboutUs';
import CheckVersion from '~/screens/Main/Profile/CheckVersion';
import BlockedUsers from '~/screens/Main/Profile/BlockedUsers';
import ProfileNotifications from '~/screens/Main/Profile/Notifications';
import AccountSecurity from '~/screens/Main/Profile/AccountSecurity';
import EditProfile from '~/screens/Main/Profile/EditProfile';
import PersonalPage from '~/screens/Main/Profile/PersonalPage';
import MyActivitiesPage from '~/screens/Main/Profile/MyActivities';
import { profile, home } from '~/navigation/routeNames';
import Settings from '~/screens/Main/Profile/Settings';
import NewPost from '~/screens/Main/Home/NewPost';
import ChatRoom from '~/screens/Main/Chat/ChatRoom';

const Stack = createStackNavigator();

const ProfilePrivacy = (props) => <Settings data={privacyData} {...props} />;

const MainNav = () => (
  <Stack.Navigator screenOptions={{ header: MainHeader }} initialRouteName={profile.editProfile} headerMode="screen">
    <Stack.Screen name={profile.editProfile} component={EditProfile} options={{ title: 'Edit profile' }} />
    <Stack.Screen
      name={profile.accountSecurity}
      component={AccountSecurity}
      options={{ title: 'Account and Security' }}
    />
    <Stack.Screen name={profile.notifications} component={ProfileNotifications} options={{ title: 'Notifications' }} />
    <Stack.Screen name={profile.privacy} component={ProfilePrivacy} options={{ title: 'Privacy' }} />
    <Stack.Screen name={profile.blockedUsers} component={BlockedUsers} options={{ title: 'Blocked users' }} />
    <Stack.Screen name={profile.checkVersion} component={CheckVersion} options={{ title: 'Version' }} />
    <Stack.Screen
      name={profile.personalPage}
      component={PersonalPage}
      options={{ headerShown: false, headerTransparent: true }}
    />
    <Stack.Screen name={profile.myActivities} component={MyActivitiesPage} options={{ title: 'My activities' }} />
    <Stack.Screen name={profile.bookmarks} options={{ title: 'Bookmarks' }}>
      {(props) => <MyActivitiesPage type="bookmark" {...props} />}
    </Stack.Screen>
    <Stack.Screen name={profile.aboutUs} component={AboutUs} options={{ title: 'About Us' }} />
    <Stack.Screen
      name={home.newPost}
      component={NewPost}
      options={{ title: 'Make a Post', header: (props) => <MainHeader variant="post" {...props} /> }}
    />
    <Stack.Screen name={home.chatRoom} component={ChatRoom} options={{ header: MainHeader }} />
  </Stack.Navigator>
);

export default MainNav;
