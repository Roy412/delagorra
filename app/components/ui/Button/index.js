import React from 'react';
import _ from 'lodash';

// import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const variantStyles = {
  primary: {
    container: {
      // backgroundColor: Colors.pink,
    },
    text: {
      // color: Colors.white,
    },
  },
  transparent: {
    container: {
      height: 'auto',
    },
    text: {
      // color: Colors.black,
    },
  },
};

const Button = ({ variant = 'primary', text, style = {}, textStyle = {}, onPress = _.noop, disabled = false }) => {
  const variantStyle = variantStyles[variant];

  return (
    <Styled.Container
      style={[variantStyle.container, variant !== 'transparent', style]}
      onPress={onPress}
      disabled={disabled}>
      <Styled.Text style={[variantStyle.text, textStyle]}>{text}</Styled.Text>
    </Styled.Container>
  );
};

export default Button;
