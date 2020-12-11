import styled from 'styled-components/native';
import { BallIndicator } from 'react-native-indicators';

import { Colors } from '~/utils/theme';

export { Box } from '~/components/ui';

export const Indicator = styled(BallIndicator).attrs({
  color: Colors.pink,
})``;
