import styled from 'styled-components/native';
import { KeyboardAvoidingView as KeyboardAvoidingViewUI } from 'react-native';

import { Button } from '~/components/ui';
export { TextInput, Loader, Text, Box, Button } from '~/components/ui';

export const LinkButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'pureBlue', fontStyle: 'regular' },
})``;
