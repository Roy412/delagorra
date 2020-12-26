import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const FocusAwareStatusBar = (props) => {
  let isFocused = useIsFocused();
  isFocused = true;

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
