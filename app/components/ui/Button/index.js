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
      color: 'white',
      fontSize: 16,
    },
  },
  text: {
    container: {
      height: 'auto',
    },
    text: {
      color: 'black',
      fontSize: 16,
    },
  },
  outlined: {
    container: {
      height: 'auto',
      borderWidth: 1,
      borderColor: Colors.pink,
      borderRadius: 2,
    },
    text: {
      color: 'pink',
      fontSize: 16,
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
    <Styled.Container style={[variantStyle.container, style]} onPress={onPress} disabled={disabled} {...props}>
      <Styled.Text style={textStyle} {...{ ...variantStyle.text, ...textProps }}>
        {text}
      </Styled.Text>
    </Styled.Container>
  );
};

export default Button;
