import { createSelector } from 'reselect';

import _ from 'lodash';

const getState = (state) => state.post;

export const posts = createSelector(getState, (state) => _.get(state, 'posts'));
export const searchPosts = createSelector(getState, (state) => _.get(state, 'searchPosts'));
export const profilePosts = createSelector(getState, (state) => _.get(state, 'profilePosts'));
export const postByPostId = (postId) => createSelector(posts, (state) => _.find(state, { _id: postId }));
export const sharing = createSelector(getState, (state) => state.sharing);
