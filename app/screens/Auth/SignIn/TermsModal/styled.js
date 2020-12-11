import styled from 'styled-components/native';
import ModalUI from 'react-native-modalbox';

import { Button } from '~/components/ui';

export { Text, Box, Button } from '~/components/ui';

export const LinkButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'pureBlue', fontStyle: 'regular' },
})``;

export const Modal = styled(ModalUI)`
  height: auto;
`
