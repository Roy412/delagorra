import React from 'react';

import { Container, Icon, Badge, BadgeText } from './styled';

const TabBarItem = ({ source, tintColor, notifications = 0 }) => (
  <Container>
    <Icon size={24} source={source} tintColor={tintColor} />
    {notifications > 0 && (
      <Badge>
        <BadgeText>{notifications > 100 ? '99+' : notifications}</BadgeText>
      </Badge>
    )}
  </Container>
);

export default TabBarItem;
