import React from 'react';

import { Container, Icon, Badge, BadgeText } from './styled';

const TabBarItem = ({ source, tintColor, width = 22, aspectRatio = 1, notifications = 0 }) => (
  <Container>
    <Icon width={width} aspectRatio={aspectRatio} source={source} tintColor={tintColor} />
    {notifications > 0 && (
      <Badge>
        <BadgeText>{notifications > 100 ? '99+' : notifications}</BadgeText>
      </Badge>
    )}
  </Container>
);

export default TabBarItem;
