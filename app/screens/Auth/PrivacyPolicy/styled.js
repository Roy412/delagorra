import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

export { Text, Box, Button } from '~/components/ui';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 30 },
})`
  flex: 1;
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
`;
