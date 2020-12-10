import get from 'lodash/get';
import omit from 'lodash/omit';

import { mergeEntities } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';

import handlersReducer from './handlers';

const INITIAL_STATE = {};

const shouldCache = (action) => action.type === 'Specific_Action_Name';

const shouldReset = (action) => action.type === AuthTypes.LOG_OUT_SUCCESS;

export default (state = INITIAL_STATE, action) => {
  const data = get(action, 'entities');

  if (shouldReset(action)) {
    return INITIAL_STATE;
  }

  if (shouldCache(action)) {
    return handlersReducer(mergeEntities(state, omit(data, 'meta')), action);
  }

  return state;
};
