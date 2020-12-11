import styled from 'styled-components/native';
import ModalUI from 'react-native-modalbox';

import { Button } from '~/components/ui';
import { Metrics } from '~/utils/theme';

export { Text, Box, Button } from '~/components/ui';

export const LinkButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'pureBlue', fontStyle: 'regular' },
})``;

export const Modal = styled(ModalUI)`
  height: auto;
  width: ${Metrics.screenWidth - 70}px;
`;
