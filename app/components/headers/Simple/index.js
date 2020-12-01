import React from 'react';
import { StatusBar } from 'react-native';

import { Colors, Metrics } from '~/utils/theme';
import * as Styled from './styled';

const SimpleHeader = ({ bg = Colors.background, barStyle = 'light', ...props }) => {
  const backgroundColor = bg || barStyle === 'light' ? bg : Colors.pink;
  return (
    <Styled.Container style={{ backgroundColor, height: Metrics.statusBarHeight }}>
      <StatusBar
        barStyle={barStyle === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundColor}
        {...props}
      />
    </Styled.Container>
  );
};

export default SimpleHeader;
