import React from 'react';

import * as Styled from './styled';

const CommentsHeader = ({ count, title }) => (
  <Styled.Box flexDirection="row" alignItems="center" bg="#F0F0F0" p={16}>
    <Styled.Text color="veryDarkGray" fontSize={16}>
      {title}
      {count && ` (${count})`}
    </Styled.Text>
  </Styled.Box>
);

export default CommentsHeader;
