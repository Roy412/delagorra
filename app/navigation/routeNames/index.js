import { createNames } from 'utils/navigation';

export const navigators = createNames(['auth'], {
  prefix: 'navigators/',
});

export const auth = createNames(['signIn'], {
  prefix: 'auth/',
});
