import styled from 'styled-components/native';
import { KeyboardAvoidingView as KeyboardAvoidingViewUI, SafeAreaView } from 'react-native';

import { crossIcon } from '~/resources';
import { IconButton } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { TextInput, Loader, Text, Box, Button, BackButton } from '~/components/ui';

export const KeyboardAvoidingView = styled(KeyboardAvoidingViewUI)`
  flex: 1;
`;

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
