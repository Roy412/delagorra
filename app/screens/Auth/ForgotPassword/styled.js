import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView as KeyboardAwareScrollViewUI } from 'react-native-keyboard-aware-scroll-view';

export { TextInput, Loader, Text, Box, Button, BackButton } from '~/components/ui';

export const KeyboardAwareScrollView = styled(KeyboardAwareScrollViewUI).attrs({
  contentContainerStyle: { flex: 1 },
  keyboardShouldPersistTaps: 'handled',
})``;

export const Container = styled(SafeAreaView)`
  flex: 1;
`;
