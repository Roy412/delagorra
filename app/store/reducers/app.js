import Immutable from 'seamless-immutable';

import pick from 'lodash/pick';

import { createReducer } from '../redux';

import { AppTypes } from '~/store/actions/app';
import { AuthTypes } from '~/store/actions/auth';

export const INITIAL_STATE = Immutable({
  isRehydrated: false,
  isRefetched: false,
});

const completeRefetch = (state) => state.merge({ isRefetched: true });
const completeRehydration = (state) => state.merge({ isRehydrated: true });

export const HANDLERS = {
  [AppTypes.COMPLETE_REFETCH]: completeRefetch,
  [AppTypes.COMPLETE_REHYDRATION]: completeRehydration,
};

const resetFn = (state, initialState) => initialState.merge(pick(state, 'isRehydrated'));

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetFn,
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
