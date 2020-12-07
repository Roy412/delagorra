import FastImageUI from 'react-native-fast-image';

import styled from 'styled-components/native';
import { size, space, backgroundColor } from 'styled-system';

export const Image = styled.Image`
  ${space}
  ${size}
  ${backgroundColor}
`;

export const FastImage = styled(FastImageUI)`
  ${space}
  ${size}
  ${backgroundColor}
`;
