import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import PostListUI from './PostList';

export { Text, Box, Button, IconButton } from '~/components/ui';

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const PostList = styled(PostListUI)``;
