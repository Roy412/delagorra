import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Colors } from '~/utils/theme';

import { Button } from '~/components/ui';

export { Text, Box, Button } from '~/components/ui';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.white};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: rgba(196, 196, 196, 0.15);
  border-radius: 20px;
  padding-horizontal: 16px;
  color: black;
`;

export const SendButton = styled(Button).attrs({
  text: 'Send',
  variant: 'text',
  ml: 16,
  textProps: { color: 'pink', fontSize: 18 },
})``;
