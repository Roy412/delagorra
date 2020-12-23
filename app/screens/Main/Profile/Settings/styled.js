import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Button } from '~/components/ui';

export { Text, Box, Button, IconButton } from '~/components/ui';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 30 },
})`
  flex: 1;
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const LeftButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'white', fontStyle: 'regular', fontSize: 17 },
})`
  flex: 1;
`;
