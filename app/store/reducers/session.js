import Immutable from 'seamless-immutable';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { ProfileTypes } from '~/store/actions/profile';

const INITIAL_STATE = Immutable({
  user: null,
  token: null,
});

const signInSuccess = (state, { payload }) => state.merge({ user: payload.user, token: payload.token });

const signInFailure = () => INITIAL_STATE;

const profileUpdateSuccess = (state, { payload }) => state.merge({ user: { ...state.user, ...payload.user } });

const HANDLERS = {
  [AuthTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [AuthTypes.SIGN_IN_FAILURE]: signInFailure,
  [ProfileTypes.PROFILE_UPDATE_SUCCESS]: profileUpdateSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
