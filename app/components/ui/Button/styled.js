import styled from 'styled-components/native';

import TextUI from '../Text';

export const Container = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Text = styled(TextUI).attrs(({ family }) => ({
  family: family || 'semibold',
}))``;
