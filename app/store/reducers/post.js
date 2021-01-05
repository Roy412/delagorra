import Immutable from 'seamless-immutable';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/profile';

const INITIAL_STATE = Immutable({
  posts: [],
});

// const createPostSuccess = (state, { payload }) =>
//   state.merge({ user: { ...state.user, ...buildUser(payload.user) } });

const HANDLERS = {
  // [PostTypes.CREATE_POST_SUCCESS]: createPostSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
