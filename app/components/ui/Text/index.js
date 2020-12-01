import React from 'react';
import { Text as TextUI } from 'react-native';

import { capitalizeFirstLetter } from '~/utils/utils';
import { Colors } from '~/utils/theme';

const Text = ({ family = 'regular', color = Colors.veryDarkGray, fontSize = 16, children, align='left' }) => {
  const inlineStyle = {
    fontFamily: `SFUIDisplay-${capitalizeFirstLetter(family)}`,
    color,
    fontSize,
    textAlign: align,
  };
  return <TextUI style={inlineStyle}>{children}</TextUI>;
};

export default Text;
