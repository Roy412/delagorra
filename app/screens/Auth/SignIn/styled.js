import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView as KeyboardAwareScrollViewUI } from 'react-native-keyboard-aware-scroll-view';

import { crossIcon } from '~/resources';
import { IconButton, Button } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { TextInput, Loader, Text, Box, Button, BackButton } from '~/components/ui';

export const KeyboardAwareScrollView = styled(KeyboardAwareScrollViewUI).attrs({
  contentContainerStyle: { flex: 1 },
  keyboardShouldPersistTaps: 'always',
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

export const ModeButton = styled(Button).attrs((props) => ({
  variant: 'text',
  text: props.loginMode === 'sms' ? 'Account and password login' : 'Phone number quick login',
  textProps: { color: 'veryDarkGray', fontSize: 14 },
  textStyle: { opacity: 0.5 },
  py: 20,
}))``;

export const ForgotButton = styled(Button).attrs((props) => ({
  variant: 'text',
  text: 'Forgot password',
  textProps: { color: 'veryDarkGray', fontSize: 13, fontStyle: 'regular' },
  py: 5,
  ml: 10,
}))`
  align-self: flex-start;
`;
