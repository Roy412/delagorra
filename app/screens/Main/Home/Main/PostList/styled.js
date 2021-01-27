import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import PostItemUI from '../PostItem';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList`
  flex: 1;
  background-color: ${Colors.background};
`;

export const PostItem = styled(PostItemUI)`
  margin-bottom: 10px;
`;
