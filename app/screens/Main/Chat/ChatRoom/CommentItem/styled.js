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

export const OptionButton = styled(IconButton).attrs({
  source: dotsIcon,
  hitSlop: hitSlopArea(5),
  iconStyle: { width: 18, aspectRatio: 80 / 18, height: undefined },
  pb: 10,
})``;

export const ReplyContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(19, 19, 19, 0.05);
  border-radius: 15px;
  padding-horizontal: 8px;
  height: 25px;
  align-self: flex-start;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const CommentIcon = styled(Image).attrs({
  source: commentIcon,
  tintColor: Colors.darkGray,
  size: 12,
})``;

export const LikeButton = styled(IconButton).attrs((props) => ({
  source: props.unLike ? unlikeIcon : likeIcon,
  hitSlop: hitSlopArea(5),
  size: 22,
  tintColor: props.active ? 'pink' : 'rgba(0,0,0,0.25)',
}))``;
