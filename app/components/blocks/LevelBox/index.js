import React from 'react';

import * as Styled from './styled';

const levelColors = {
  1: '#FAC714',
};

const LevelBox = ({ level }) => (
  <Styled.Container style={{ backgroundColor: levelColors[level] }}>
    <Styled.Text color="white" fontSize={13} fontStyle="semiBold">{`LV ${level}`}</Styled.Text>
  </Styled.Container>
);

export default LevelBox;
