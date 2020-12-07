import styled from 'styled-components/native';
import { ActivityIndicator as ActivityIndicatorUI } from 'react-native';

import { Colors } from '~/utils/theme';
import { hitSlopArea } from '~/utils/utils';
import { crossIcon } from '~/resources';

import FieldErrorUI from '../FieldError';
import TextUI from '../Text';
import Button from '../Button';
import IconButton from '../IconButton';

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
  mr: 15,
})``;

export const ActivityIndicator = styled(ActivityIndicatorUI)`
  margin-right: 20px;
`;

export const ClearButton = styled(IconButton).attrs({
  source: crossIcon,
  hitSlop: hitSlopArea(5),
  mr: 10,
  size: 15,
})``;
