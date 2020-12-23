import { profile } from '~/navigation/routeNames';

export const settingsData = [
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
    route: profile.about,
  },
];

export const privacyData = [
  {
    label: 'Blocked users',
    route: profile.blockedUsers,
  },
];
