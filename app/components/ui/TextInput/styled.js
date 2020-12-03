import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import FieldErrorUI from '../FieldError';

export const Container = styled.View`
  flex-direction: column;
  padding-vertical: 7.5px;
`;

export const Input = styled.TextInput`
  background-color: ${Colors.white};
  padding-horizontal: 15px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid ${Colors.lightGrayishBlue};
`;

export const FieldError = styled(FieldErrorUI)`
  position: absolute;
  bottom: -22px;
  left: 20px;
`;
