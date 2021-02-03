import React from 'react';

import * as Styled from './styled';

const Badge = ({ value, ...props }) => {
  if (!value || value === 0) {
    return null;
  }
  return (
    <Styled.Container {...props}>
      <Styled.Text color="white" fontStyle="semiBold" fontSize={14}>
        {value}
      </Styled.Text>
    </Styled.Container>
  );
}

export default Badge;
