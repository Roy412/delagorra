import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';
import { arrowDownIcon } from '~/resources';
import { Image } from '~/components/ui';

import PostItemUI from '../PostItem';
import SortPanelUI from './SortPanel';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList`
  flex: 1;
  background-color: ${Colors.background};
`;

export const PostItem = styled(PostItemUI)`
  margin-bottom: 10px;
`;

export const ArrowDownIcon = styled(Image).attrs({
  source: arrowDownIcon,
})`
  width: 20px;
  aspect-ratio: ${13 / 6};
  height: ${'undefined'};
`;

export const SearchResults = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.background};
  justify-content: space-between;
  padding: 10px;
`;

export const SortPanel = styled(SortPanelUI)``;
