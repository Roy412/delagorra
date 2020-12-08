import FastImageUI from 'react-native-fast-image';
import styled from 'styled-components/native';
import { size, space } from 'styled-system';

import { tintColor } from '~/utils/theme/rules';

export const Image = styled.Image`
  ${space}
  ${size}
  ${tintColor}
`;

export const FastImage = styled(FastImageUI)`
  ${space}
  ${size}
`;
