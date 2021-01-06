import styled from 'styled-components/native';

import { appLogoIcon, searchIcon } from '~/resources';
import { Image, Button, Box } from '~/components/ui';

import PostListUI from './PostList';

export { Text, Box, Button, IconButton } from '~/components/ui';

export const Content = styled.View`
  flex: 1;
`;

export const PostList = styled(PostListUI)``;

export const LogoIcon = styled(Image).attrs({
  source: appLogoIcon,
  mr: 16,
})`
  width: 25px;
  aspect-ratio: ${151 / 160};
`;

export const CreateButton = styled(Button).attrs({ py: 7, px: 10, ml: 16 })`
  height: auto;
  border-radius: 20px;
`;

export const SearchContainer = styled(Box).attrs({
  borderRadius: 10,
  bg: 'rgba(118, 118, 128, 0.12)',
  flexDirection: 'row',
  alignItems: 'center',
  px: 8,
  py: 9,
})`
  flex: 1;
`;

export const SearchIcon = styled(Image).attrs({
  source: searchIcon,
  mr: 7,
})`
  width: 16px;
  aspect-ratio: ${80 / 76};
`;

export const SearchInput = styled.TextInput.attrs({
  returnKeyType: 'search',
  placeholder: 'Search',
})`
  flex: 1;
`;
