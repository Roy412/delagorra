import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import NotificationItemUI from './NotificationItem';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList`
  flex: 1;
  background-color: ${Colors.background};
`;

export const NotificationItem = styled(NotificationItemUI)`
  margin-bottom: 10px;
`;
