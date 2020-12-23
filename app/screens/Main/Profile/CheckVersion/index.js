import React from 'react';
import DeviceInfo from 'react-native-device-info';

import * as Styled from './styled';

const CheckVersion = () => (
  <Styled.Box bg="white" p={20}>
    <Styled.Text fontSize={18}>Version: {DeviceInfo.getVersion()}</Styled.Text>
    <Styled.Text fontSize={16} mt={20}>
      Build Number: {DeviceInfo.getBuildNumber()}
    </Styled.Text>
  </Styled.Box>
);

export default CheckVersion;
