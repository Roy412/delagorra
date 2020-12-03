import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

import FieldErrorUI from '../FieldError';
import TextUI from '../Text';
import Button from '../Button';

export const Container = styled.View`
  padding-vertical: 10px;
`;

export const InputContainer = styled.View`
  height: 46px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.white};
  border-radius: 10px;
  border-width: 1px;
  ${({ isFocused }) => `border-color: ${Colors[isFocused ? 'veryDarkGray' : 'lightGrayishBlue']};`}
  ${({ hasError }) => hasError && `border-color: ${Colors.pink};`}
`;

export const Input = styled.TextInput`
  flex: 1;
  align-self: stretch;
  padding-horizontal: 15px;
  color: ${Colors.veryDarkGray};
`;

export const FieldError = styled(FieldErrorUI)`
  position: absolute;
  bottom: -6px;
  left: 10px;
`;

export const FlagText = styled(TextUI).attrs({
  color: Colors.veryDarkGray,
  fontSize: 15,
})`
  margin-left: 15px;
  margin-bottom: 2px;
`;

export const SendButton = styled(Button).attrs({
  variant: 'transparent',
  textStyle: { color: Colors.pink },
  textProps: { family: 'regular' },
})`
  margin-right: 15px;
`;
