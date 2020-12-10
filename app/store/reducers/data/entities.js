import get from 'lodash/get';
import omit from 'lodash/omit';

import { mergeEntities } from '~/store/redux';
import { AppTypes } from '~/store/actions/app';
import { AuthTypes } from '~/store/actions/auth';

import handlersReducer from './handlers';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const data = get(action, 'response.data') || get(action, 'entities');

  // React on every action with data field which isn't errorish
  if (!action.error && (data || action.payload)) {
    return handlersReducer(mergeEntities(state, omit(data, 'meta')), action);
  }

  if (action.type === AuthTypes.LOG_OUT_SUCCESS || action.type === AppTypes.REFRESH) {
    return INITIAL_STATE;
  }

  return state;
};
