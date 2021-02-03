import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import LobbyItemUI from './LobbyItem';

export { Text, Box, Image } from '~/components/ui';

export const List = styled.FlatList`
  flex: 1;
  background-color: ${Colors.background};
`;

export const LobbyItem = styled(LobbyItemUI)`
  margin-bottom: 5px;
`;
