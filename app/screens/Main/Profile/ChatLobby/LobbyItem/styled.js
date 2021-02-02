import styled from 'styled-components/native';

import { IconButton, Image, Box } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { dotsIcon, commentIcon, likeIcon, unlikeIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';
export { LevelBox } from '~/components/blocks';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 19px;
  padding-vertical: 20px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;

export const UnreadWrapper = styled(Box)`
  min-width: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 6px;
`;
