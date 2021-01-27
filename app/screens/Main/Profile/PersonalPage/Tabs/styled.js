import styled from 'styled-components/native';

import { Metrics } from '~/utils/theme';

import PostListUI from '../../../Home/Main/PostList';

export const PostList = styled(PostListUI).attrs({
  contentContainerStyle: { paddingBottom: Metrics.bottomSpace, marginTop: 3 },
})``;
