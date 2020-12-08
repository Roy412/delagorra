import styled from 'styled-components/native';
import { KeyboardAvoidingView as KeyboardAvoidingViewUI, SafeAreaView } from 'react-native';

export { TextInput, Loader, Text, Box, Button } from '~/components/ui';

export const KeyboardAvoidingView = styled(KeyboardAvoidingViewUI)`
  flex: 1;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
`;
