import styled from 'styled-components/native';
import { Text as TextUI } from 'react-native';

export const Container = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Text = styled(TextUI)``;
