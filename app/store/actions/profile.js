import { createActions } from 'reduxsauce';

export const { Types: ProfileTypes, Creators: ProfileCreators } = createActions(
  {
    profileUpdateRequest: ['payload', 'resolve', 'reject'],
    profileUpdateSuccess: ['payload'],

    getProfileRequest: ['payload', 'resolve', 'reject'],

    profileFollowRequest: ['payload', 'resolve', 'reject'],
  },
  { prefix: 'Profile/' },
);
