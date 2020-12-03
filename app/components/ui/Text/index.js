import React from 'react';

import { capitalizeFirstLetter } from '~/utils/utils';
import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const Text = ({ family = 'regular', color = Colors.veryDarkGray, fontSize = 16, children, align = 'left', style }) => {
  const inlineStyle = {
    fontFamily: `SFUIDisplay-${capitalizeFirstLetter(family)}`,
    color,
    fontSize,
    textAlign: align,
  };
  return <Styled.Text style={[inlineStyle, style]}>{children}</Styled.Text>;
};

export default Text;