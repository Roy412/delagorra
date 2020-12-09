import { createNames } from '~/utils/navigation';

export const navigators = createNames(['auth', 'main'], {
  prefix: 'navigators/',
});

export const auth = createNames(['signIn', 'setUpPassword', 'privacyPolicy'], {
  prefix: 'auth/',
});

export const main = createNames(['home', 'notification', 'profile'], {
  prefix: 'main/',
});
