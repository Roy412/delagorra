import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import CommentItemUI from '../PersonalCommentItem';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList`
  flex: 1;
  background-color: ${Colors.background};
`;

export const CommentItem = styled(CommentItemUI)`
  margin-bottom: 5px;
`;
