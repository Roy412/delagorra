import { createNames } from '~/utils/navigation';

export const navigators = createNames(['auth', 'main', 'mainNav', 'progress', 'privacyPolicy', 'replyRoom'], {
  prefix: 'navigators/',
});

export const auth = createNames(['signIn', 'setUpPassword', 'forgot'], {
  prefix: 'auth/',
});

export const main = createNames(['home', 'notification', 'profile'], {
  prefix: 'main/',
});

export const home = createNames(['main', 'newPost', 'chatRoom'], {
  prefix: 'home/',
});

export const notification = createNames(['list'], {
  prefix: 'notification/',
});

export const profile = createNames(
  [
    'main',
    'settings',
    'editProfile',
    'accountSecurity',
    'notifications',
    'blockedUsers',
    'privacy',
    'checkVersion',
    'aboutUs',
    'personalPage',
    'myActivities',
  ],
  {
    prefix: 'profile/',
  },
);

export const personalPage = createNames(['posts', 'comments'], {
  prefix: 'personalPage/',
});
