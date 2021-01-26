import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/post';

const INITIAL_STATE = Immutable({
  posts: [],
});

const getPostsSuccess = (state, { payload }) => {
  let updatedPosts = payload.posts;
  if (payload.isRefresh) {
    updatedPosts = _.unionBy(state.posts, payload.posts, '_id');
  }
  return state.merge({ posts: updatedPosts });
};

const postLikeSuccess = (state, { payload: { postId, like, totalLikes } }) => {
  const updatedPosts = _.map(state.posts, (item) => {
    const result = { ...item };
    if (item._id === postId) {
      result.like = like;
      if (totalLikes !== undefined) {
        result.totalLikes = totalLikes;
      }
    }
    return result;
  });
  return state.merge({ posts: updatedPosts });
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
