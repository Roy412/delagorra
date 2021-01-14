import { createActions } from 'reduxsauce';

export const { Types: ProfileTypes, Creators: ProfileCreators } = createActions(
  {
    profileUpdateRequest: ['payload', 'resolve', 'reject'],
    profileUpdateSuccess: ['payload'],

    getProfileRequest: ['profileId', 'resolve', 'reject'],
  },
  { prefix: 'Profile/' },
);
