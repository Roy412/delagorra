import React from 'react';
import { Text as TextUI } from 'react-native';

import { capitalizeFirstLetter } from '~/utils/utils';
import { Colors } from '~/utils/theme';

const Text = ({ family = 'regular', color = Colors.veryDarkGray, fontSize = 16 }) => {
  const inlineStyle = {
    fontFamily: `SFUIDisplay-${capitalizeFirstLetter(family)}`,
    color,
    fontSize,
  };
  return <TextUI style={inlineStyle} />;
};

export default Text;
