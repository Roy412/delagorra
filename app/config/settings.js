import { profile } from '~/navigation/routeNames';

export const settingsData = [
  {
    label: 'Notifications',
    route: profile.notifications,
  },
  {
    label: 'Privacy',
    route: profile.privacy,
  },
  {
    label: 'Clear cache',
  },
  {
    label: 'Check version of the app',
    route: profile.checkVersion,
  },
  {
    label: 'About Us',
    route: profile.aboutUs,
  },
];

export const privacyData = [
  {
    label: 'Blocked users',
    route: profile.blockedUsers,
  },
];
