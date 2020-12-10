import { createSelector } from 'reselect';

const getState = (state) => state.app;

export const isRehydrated = createSelector(getState, (state) => state.isRehydrated);
