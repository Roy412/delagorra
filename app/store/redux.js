import build from 'redux-object';

import assign from 'lodash/assign';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';

import { latestArrayMerger } from './mergers';

export const createReducer = (initialState, handlers, dirtyOptions) => (state = initialState, action) => {
  const DEFAULT_OPTIONS = {
    resetOn: [],
    resetFn: (currState, initState) => initState,
  };
  const options = merge({}, DEFAULT_OPTIONS, dirtyOptions);

  if (includes(options.resetOn, action.type)) {
    return options.resetFn(state, initialState);
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export const denormalize = (entities, type, id, opts = {}) => {
  if (isNil(id)) {
    return null;
  }

  const ids = isArray(id) ? map(id, (i) => i.id || i) : id;
  const result = build(entities, type, ids, { eager: true }) || (isArray(id) ? [] : null);

  if (!opts.withLinks) {
    return result;
  }

  const addLinks = (item) =>
    assign({}, item, {
      links: entities[type][item.id].links,
    });

  return isArray(result) ? map(result, addLinks) : addLinks(result);
};

export const mergeEntities = (state, ...entities) => mergeWith({}, state, ...entities, latestArrayMerger);
