import { Dimensions } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUS_BAR_HEIGHT = getStatusBarHeight(true);
const BOTTOM_SPACE = getBottomSpace();

const { width, height } = Dimensions.get('window');

export default {
  statusBarHeight: STATUS_BAR_HEIGHT,
  bottomSpace: BOTTOM_SPACE,
  mainTabBarHeight: 50,

  screenWidth: width,
  screenHeight: height,
};
