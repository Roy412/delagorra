import styled from 'styled-components/native';

import { IconButton, Image } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { dotsIcon, commentIcon, likeIcon, unlikeIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';
export { LevelBox } from '~/components/blocks';

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ReplyContainer = styled.TouchableOpacity`
  background-color: rgba(19, 19, 19, 0.03);
  padding: 9px;
`;

export const LikeButton = styled(IconButton).attrs((props) => ({
  source: props.unLike ? unlikeIcon : likeIcon,
  hitSlop: hitSlopArea(5),
  size: 22,
  tintColor: props.active ? 'pink' : 'rgba(0,0,0,0.25)',
}))``;
