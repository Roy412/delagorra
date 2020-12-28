import React from 'react';

import * as Styled from './styled';

const AvatarPicker = ({ url, ...props }) => <Styled.ProfileImage source={url && { uri: url }} {...props} />;

export default AvatarPicker;
