import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import FieldErrorUI from '../FieldError';

export const Container = styled.View`
  flex-direction: column;
  padding-vertical: 10px;
`;

export const Input = styled.TextInput`
  background-color: ${Colors.white};
  padding-horizontal: 15px;
  height: 46px;
  border-radius: 10px;
  border-width: 1px;

  ${({ isFocused }) => `border-color: ${Colors[isFocused ? 'veryDarkGray' : 'lightGrayishBlue']};`}
  ${({ hasError }) => hasError && `border-color: ${Colors.pink};`}
`;

export const FieldError = styled(FieldErrorUI)`
  position: absolute;
  bottom: -6px;
  left: 10px;
`;
