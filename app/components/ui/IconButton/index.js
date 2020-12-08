import React from 'react';
import _ from 'lodash';

import { Touchable, Image } from './styled';

const IconButton = ({ source, size, tintColor, style = {}, onPress = _.noop, iconStyle = {}, ...restProps }) => (
  <Touchable {...restProps} style={style} onPress={onPress}>
    <Image source={source} size={size} tintColor={tintColor} style={iconStyle} />
  </Touchable>
);

export default IconButton;
