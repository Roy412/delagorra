import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import set from 'lodash/set';

/**
 * Accepts routes hash and returns navigation-ready routes names using "options"
 * argument with prefix
 */

export const createNames = (routes, dirtyOptions) => {
  const DEFAULT_OPTIONS = { prefix: '' };
  const options = merge({}, DEFAULT_OPTIONS, dirtyOptions);

  return reduce(routes, (names, route) => set(names, route, options.prefix ? options.prefix + route : route), {});
};
