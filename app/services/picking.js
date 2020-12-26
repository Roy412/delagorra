import { Platform } from 'react-native';

import find from 'lodash/find';
import isNil from 'lodash/isNil';
import negate from 'lodash/negate';

const platformOS = () => Platform.OS;

const platform = (options, fallback = null) => find([options[platformOS()], options.default, fallback], negate(isNil));

export default {
  platform,
  platformOS,
};
