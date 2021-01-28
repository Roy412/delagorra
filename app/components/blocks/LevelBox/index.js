import React from 'react';

import * as Styled from './styled';

const levelColors = {
  1: '#FAC714',
};

const LevelBox = ({ level, style, fontSize = 13, ...props }) => (
  <Styled.Container style={{ backgroundColor: levelColors[level], ...style }} {...props}>
    <Styled.Text color="white" fontSize={fontSize} fontStyle="semiBold">{`LV ${level}`}</Styled.Text>
  </Styled.Container>
);

export default LevelBox;
