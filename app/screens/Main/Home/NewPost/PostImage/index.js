import React from 'react';

import * as Styled from './styled';

const PostImage = ({ url, onDelete, style }) => (
  <Styled.Container style={style}>
    <Styled.Image source={{ uri: url }} />

    <Styled.DeleteButton onPress={onDelete} />
  </Styled.Container>
);

export default PostImage;
