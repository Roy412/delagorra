import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { gearIcon } from '~/resources';
import { IconButton } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Button, IconButton } from '~/components/ui';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 30 },
})`
  flex: 1;
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const GearButton = styled(IconButton).attrs({
  source: gearIcon,
  hitSlop: hitSlopArea(5),
  pl: 17,
  tintColor: 'white',
  size: 20,
})``;
