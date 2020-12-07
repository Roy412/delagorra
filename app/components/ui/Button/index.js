import React from 'react';
import _ from 'lodash';

import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const variantStyles = {
  primary: {
    container: {
      backgroundColor: Colors.pink,
    },
    text: {
      color: Colors.white,
    },
  },
  transparent: {
    container: {
      height: 'auto',
    },
    text: {
      color: Colors.black,
    },
  },
};

const Button = ({
  variant = 'primary',
  text,
  style = {},
  textStyle = {},
  textProps = {},
  onPress = _.noop,
  disabled = false,
  ...props
}) => {
  const variantStyle = variantStyles[variant];

  return (
    <Styled.Container
      style={[variantStyle.container, variant !== 'transparent', style]}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      <Styled.Text style={[variantStyle.text, textStyle]} {...textProps}>
        {text}
      </Styled.Text>
    </Styled.Container>
  );
};

export default Button;
