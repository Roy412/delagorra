import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/post';

const INITIAL_STATE = Immutable({
  posts: [],
  profilePosts: [],
  searchPosts: [],
  sharing: false,
});

const updatePosts = (prevPosts, payload) => {
  let updatedPosts = payload.posts;
  if (!payload.isRefresh) {
    updatedPosts = _.unionBy(prevPosts, payload.posts, '_id');
  }
  return updatedPosts;
};

const getPostsSuccess = (state, { payload }) => {
  let result;

  if (payload.profileId) {
    result = { profilePosts: updatePosts(state.profilePosts, payload) };
  } else if (payload.type === 'search') {
    result = { searchPosts: updatePosts(state.searchPosts, payload) };
  } else {
    result = { posts: updatePosts(state.posts, payload) };
  }
  return state.merge(result);
};

const updatePostStatus = (posts, postId, status) =>
  _.map(posts, (item) => {
    if (item._id === postId) {
      const result = { ...item, ...status };
      if (status.share) {
        result.totalShares = item.totalShares + 1;
      }
      return result;
    }
    return item;
  });

const postUpdateStatusSuccess = (state, { payload: { postId, status } }) =>
  state.merge({
    posts: updatePostStatus(state.posts, postId, status),
    profilePosts: updatePostStatus(state.profilePosts, postId, status),
    searchPosts: updatePostStatus(state.searchPosts, postId, status),
  });

const postCreateSuccess = (state, { post }) => {
  const sortedPosts = _.sortBy([post, ...state.posts], ({ createdAt }) => -createdAt);
  return state.merge({ posts: sortedPosts });
};

const postShareLoading = (state, { loading }) => {
  return state.merge({ sharing: loading });
};

const HANDLERS = {
  [PostTypes.GET_POSTS_SUCCESS]: getPostsSuccess,
  [PostTypes.CREATE_POST_SUCCESS]: postCreateSuccess,
  [PostTypes.POST_UPDATE_STATUS_SUCCESS]: postUpdateStatusSuccess,
  [PostTypes.POST_SHARE_LOADING]: postShareLoading,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
