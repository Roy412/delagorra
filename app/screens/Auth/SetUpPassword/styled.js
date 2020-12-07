import styled from 'styled-components/native';
import { KeyboardAvoidingView as KeyboardAvoidingViewUI } from 'react-native';

import { Button } from '~/components/ui';

export { TextInput, Loader, Text } from '~/components/ui';

export const KeyboardAvoidingView = styled(KeyboardAvoidingViewUI)`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding-horizontal: 30px;
`;

export const FormContent = styled.View``;

export const ConfirmButton = styled(Button)``;
