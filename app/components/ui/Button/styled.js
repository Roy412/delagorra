import styled from 'styled-components/native';
import { space, flexbox, flex } from 'styled-system';

import TextUI from '../Text';

export const Container = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${space}
  ${flexbox}
  ${flex}
`;

export const Text = styled(TextUI).attrs(({ fontStyle }) => ({
  fontStyle: fontStyle || 'semibold',
}))``;
