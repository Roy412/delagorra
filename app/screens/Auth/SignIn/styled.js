import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { crossIcon } from '~/resources';
import { IconButton } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { TextInput, Loader, Text, Box, Button, BackButton } from '~/components/ui';

export const KeyboardAvoidingView = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: { flex: 1 },
  keyboardShouldPersistTaps: 'handled',
})``;

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const CloseButton = styled(IconButton).attrs({
  source: crossIcon,
  hitSlop: hitSlopArea(5),
  mr: 10,
  size: 20,
})`
  position: absolute;
  left: 20px;
  top: 20px;
`;
