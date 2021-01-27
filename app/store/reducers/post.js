import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/post';

const INITIAL_STATE = Immutable({
  posts: [],
  profilePosts: [],
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
  } else {
    result = { posts: updatePosts(state.posts, payload) };
  }
  return state.merge(result);
};

const updatePostStatus = (posts, postId, status) =>
  _.map(posts, (item) => {
    if (item._id === postId) {
      return { ...item, ...status };
    }
    return item;
  });

const postLikeSuccess = (state, { payload: { postId, like, totalLikes } }) => {
  const result = { like };
  if (totalLikes !== undefined) {
    result.totalLikes = totalLikes;
  }
  return state.merge({
    posts: updatePostStatus(state.posts, postId, result),
    profilePosts: updatePostStatus(state.profilePosts, postId, result),
  });
};

const postCreateSuccess = (state, { post }) => {
  const sortedPosts = _.sortBy([post, ...state.posts], ({ createdAt }) => -createdAt);
  return state.merge({ posts: sortedPosts });
};

const HANDLERS = {
  [PostTypes.GET_POSTS_SUCCESS]: getPostsSuccess,
  [PostTypes.CREATE_POST_SUCCESS]: postCreateSuccess,
  [PostTypes.POST_LIKE_SUCCESS]: postLikeSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
