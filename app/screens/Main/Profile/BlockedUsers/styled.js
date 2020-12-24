import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Button } from '~/components/ui';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const RightButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'white', fontStyle: 'regular', fontSize: 17 },
  pr: 15,
})`
  flex: 1;
`;
