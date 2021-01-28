import styled from 'styled-components/native';
import { space } from 'styled-system';

export Image from '../Image';

export const Touchable = styled.TouchableOpacity`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${space}
`;
