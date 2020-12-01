import React from 'react';
import { BallIndicator } from 'react-native-indicators';

import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const Loader = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <Styled.OverlayBackground>
      <BallIndicator color={Colors.pink} />
    </Styled.OverlayBackground>
  );
};

export default Loader;
