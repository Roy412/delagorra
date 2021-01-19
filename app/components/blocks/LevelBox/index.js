import React from 'react';

import * as Styled from './styled';

const LevelBox = ({ level }) => (
  <Styled.Container>
    <Styled.Text color="white" fontSize={13} fontStyle="semiBold">{`LV ${level}`}</Styled.Text>
  </Styled.Container>
);

export default LevelBox;
