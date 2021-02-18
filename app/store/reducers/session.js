import Immutable from 'seamless-immutable';
import { parseISO } from 'date-fns';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { ProfileTypes } from '~/store/actions/profile';
import { SearchHistoryTypes } from '~/store/actions/searchHistory';

const INITIAL_STATE = Immutable({
  user: null,
  token: null,
  searchHistory: [],
});

const buildUser = (user) => {
  if (user.birthday) {
    user.birthday = parseISO(user.birthday);
  }
  return user;
};

const signInSuccess = (state, { payload }) => state.merge({ user: buildUser(payload.user), token: payload.token });

const signInFailure = () => INITIAL_STATE;

const updateProfileSuccess = (state, { payload }) =>
  state.merge({ user: { ...state.user, ...buildUser(payload.user) } });

const searchAddSuccess = (state, { payload }) => {
  let searchHistory = [...state.searchHistory];
  _.remove(searchHistory, (item) => item === payload);
  searchHistory = [payload, ...searchHistory];

  return state.merge({ searchHistory });
};

const searchRemoveSuccess = (state, { payload }) => {
  const searchHistory = [...state.searchHistory];
  _.remove(searchHistory, (item) => item === payload);

  return state.merge({ searchHistory });
};

const HANDLERS = {
  [AuthTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [AuthTypes.SIGN_IN_FAILURE]: signInFailure,
  [ProfileTypes.PROFILE_UPDATE_SUCCESS]: updateProfileSuccess,
  [SearchHistoryTypes.SEARCH_ADD_SUCCESS]: searchAddSuccess,
  [SearchHistoryTypes.SEARCH_REMOVE_SUCCESS]: searchRemoveSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
