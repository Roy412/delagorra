import React, { useLayoutEffect } from 'react';

import * as Styled from './styled';
import PostItem from '../Main/PostItem';

const PostDetail = ({ route, navigation }) => {
  const { post } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: post.creator.displayName,
    });
  }, [navigation]);

  return (
    <Styled.Container>
      <PostItem item={post} />
    </Styled.Container>
  );
};

export default PostDetail;
