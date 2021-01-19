import React from 'react';

import * as Styled from './styled';

const AvatarCircle = ({ url, size = 35, ...props }) => {
  let source = url;
  if (typeof url === 'string') {
    source = { uri: url };
  }
  return (
    <Styled.Container {...props}>
      <Styled.ProfileImage source={url && source} size={size} />
    </Styled.Container>
  );
};

export default AvatarCircle;
