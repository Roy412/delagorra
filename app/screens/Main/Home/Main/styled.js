import styled from 'styled-components/native';

import { appLogoIcon, searchIcon } from '~/resources';
import { Image, Button, Box } from '~/components/ui';

import PostListUI from './PostList';

export { Text, Box, Button, IconButton, Loader } from '~/components/ui';
export SearchHistory from './SearchHistory';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const HeaderBar = styled(Box).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  py: 12,
  px: 16,
  bg: 'white',
})``;

export const PostList = styled(PostListUI).attrs({
  contentContainerStyle: { marginTop: 5 },
})``;

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

export const SearchWrapper = styled.TouchableWithoutFeedback``;

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
})`
  flex: 1;
`;

export const CancelButton = styled(Button).attrs({
  py: 5,
  ml: 14,
  variant: 'text',
  text: 'Cancel',
  textProps: { color: 'pink', fontStyle: 'regular' },
})``;
