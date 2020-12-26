import { createActions } from 'reduxsauce';

export const { Types: AppTypes, Creators: AppCreators } = createActions(
  {
    refresh: null,
    startup: null,
    completeRehydration: null,
  },
  { prefix: 'App/' },
);
