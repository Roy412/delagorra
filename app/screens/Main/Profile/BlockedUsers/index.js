import React, { useLayoutEffect } from 'react';

import * as Styled from './styled';

const BlockedUsers = ({ navigation }) => {
  const handleSave = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.RightButton text="Save" onPress={handleSave} />,
    });
  }, [navigation]);

  return <Styled.Container />;
};

export default BlockedUsers;
