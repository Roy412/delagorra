import styled from 'styled-components/native';

import { IconButton, Image } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { crossCircleIcon, historyIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader } from '~/components/ui';

export const List = styled.FlatList.attrs({
  contentContainerStyle: { backgroundColor: Colors.background },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;

export const ClearButton = styled(IconButton).attrs({
  source: crossCircleIcon,
  hitSlop: hitSlopArea(5),
  size: 16,
  tintColor: 'rgba(60, 60, 67, 0.8)',
})``;

export const HistoryIcon = styled(Image).attrs({
  source: historyIcon,
  size: 20,
  tintColor: 'rgb(60, 60, 67)',
})``;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-vertical: 11px;
  padding-horizontal: 16px;
  margin-top: 2px;
`;
