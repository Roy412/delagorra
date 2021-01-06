import styled from 'styled-components/native';

import { Box } from '~/components/ui';
import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;

export const Item = styled(Box)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  height: 47px;
`;
