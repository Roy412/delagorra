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
  if (payload.lastId) {
    updatedPosts = _.unionBy(state.posts, payload.posts, 'id');
  }

  return state.merge({ posts: updatedPosts });
};

const HANDLERS = {
  [PostTypes.GET_POSTS_SUCCESS]: getPostsSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
