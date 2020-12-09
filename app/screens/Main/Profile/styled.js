import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { crossIcon } from '~/resources';
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

export const CloseButton = styled(IconButton).attrs({
  source: crossIcon,
  hitSlop: hitSlopArea(5),
  pl: 17,
  tintColor: 'veryDarkGray',
  iconStyle: { width: 18, aspectRatio: 60 / 66, height: undefined },
})``;
