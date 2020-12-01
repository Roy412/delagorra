import styled from 'styled-components/native';

import FieldErrorUI from '../FieldError';

export const Container = styled.View`
  flex-direction: column;
  padding-vertical: 5px;
`;

export const Input = styled.TextInput.attrs((props) => ({}))``;

export const FieldError = styled(FieldErrorUI)`
  position: absolute;
  bottom: -22px;
  left: 20px;
`;
