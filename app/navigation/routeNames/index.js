import { createNames } from '~/utils/navigation';

export const navigators = createNames(['auth', 'main', 'progress', 'privacyPolicy'], {
  prefix: 'navigators/',
});

export const auth = createNames(['signIn', 'setUpPassword'], {
  prefix: 'auth/',
});

export const main = createNames(['home', 'notification', 'profile'], {
  prefix: 'main/',
});
