import styled from 'styled-components/native';

import { Metrics } from '~/utils/theme';

import PostListUI from '~/screens/Main/Home/Main/PostList';
import CommentListUI from './CommentList';

export const PostList = styled(PostListUI).attrs({
  contentContainerStyle: { paddingBottom: Metrics.bottomSpace, marginTop: 3 },
})``;

export const CommentList = styled(CommentListUI).attrs({
  contentContainerStyle: { paddingBottom: Metrics.bottomSpace, marginTop: 3 },
})``;
