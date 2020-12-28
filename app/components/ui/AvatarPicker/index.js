import React from 'react';

import * as Styled from './styled';

const AvatarPicker = ({ url, size, ...props }) => (
  <Styled.Container {...props}>
    <Styled.ProfileImage source={url && { uri: url }} size={size} />
  </Styled.Container>
);

export default AvatarPicker;
