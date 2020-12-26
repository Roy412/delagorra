import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { generateRandomString } from '~/utils/utils';

const FocusAwareStatusBar = (props) => {
  let isFocused = useIsFocused();
  const [key, setKey] = useState();

  useEffect(() => {
    setKey(generateRandomString());
  }, [props.barStyle]);

  return isFocused ? <StatusBar key={key} {...props} /> : null;
};

export default FocusAwareStatusBar;
