import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/post';

const INITIAL_STATE = Immutable({
  posts: [],
  postActionLoading: false,
});

const getPostsSuccess = (state, { payload }) => {
  let updatedPosts = payload.posts;
  if (payload.isRefresh) {
    updatedPosts = _.unionBy(state.posts, payload.posts, '_id');
  }
  return state.merge({ posts: updatedPosts });
};

const postLikeSuccess = (state, { payload: { postId, like } }) => {
  const updatedPosts = _.map(state.posts, (item) => {
    if (item._id === postId) {
      const totalLikes = like ? item.totalLikes + 1 : item.totalLikes - 1;
      return { ...item, totalLikes, like };
    }
    return item;
  });
  return state.merge({ posts: updatedPosts });
};

const postActionLoadingSuccess = (state, { loading }) => state.merge({ postActionLoading: loading });

const HANDLERS = {
  [PostTypes.GET_POSTS_SUCCESS]: getPostsSuccess,
  [PostTypes.POST_LIKE_SUCCESS]: postLikeSuccess,
  [PostTypes.POST_ACTION_LOADING_SUCCESS]: postActionLoadingSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
