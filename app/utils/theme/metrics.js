import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUS_BAR_HEIGHT = getStatusBarHeight(true);
const BOTTOM_SPACE = getBottomSpace();

export default {
  statusBarHeight: STATUS_BAR_HEIGHT,
  bottomSpace: BOTTOM_SPACE,
};
