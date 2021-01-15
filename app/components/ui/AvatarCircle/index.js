import React from 'react';

import * as Styled from './styled';

const AvatarCircle = ({ url, size = 35, ...props }) => (
  <Styled.Container {...props}>
    <Styled.ProfileImage source={url && { uri: url }} size={size} />
  </Styled.Container>
);

export default AvatarCircle;
