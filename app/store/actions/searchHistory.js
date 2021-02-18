import { createActions } from 'reduxsauce';

export const { Types: SearchHistoryTypes, Creators: SearchHistoryCreators } = createActions(
  {
    searchAddSuccess: ['payload'],
    searchRemoveSuccess: ['payload'],
  },
  { prefix: 'SearchHistory/' },
);
