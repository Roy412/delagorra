import { combineReducers } from 'redux';

import cache from './cache';
import entities from './entities';

export default combineReducers({
  cache,
  entities,
});
