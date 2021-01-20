import styled from 'styled-components/native';

import { IconButton, Image } from '~/components/ui';
import { Colors, Metrics } from '~/utils/theme';
import { dotsIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;

export const PostActionIcon = styled(Image).attrs({
  tintColor: 'rgba(19,19,19,0.25)',
})``;

export const OptionButton = styled(IconButton).attrs({
  source: dotsIcon,
  hitSlop: hitSlopArea(5),
  iconStyle: { width: 18, aspectRatio: 80 / 18, height: undefined },
  pt: 10,
})``;

export const PostImage = styled(Image).attrs({
  resizeMode: 'contain',
  scaleable: true,
  width: Metrics.screenWidth,
})``;
