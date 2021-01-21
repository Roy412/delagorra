import { createSelector } from 'reselect';

import get from 'lodash/get';

const getState = (state) => state.post;

export const posts = createSelector(getState, (state) => get(state, 'posts'));
export const postActionLoading = createSelector(getState, (state) => get(state, 'postActionLoading'));
