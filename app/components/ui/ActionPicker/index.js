import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import * as Styled from './styled';

const ActionPicker = ({ children, options, onPressItem, ...props }) => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...options],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex !== 0) {
            onPressItem(options[buttonIndex]);
          }
        },
      );
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <Styled.Container {...props} onPress={handlePress}>
        {children}
      </Styled.Container>
    );
  }

  return (
    <RNPickerSelect
      onValueChange={onPressItem}
      items={options.map((option) => ({ label: option, value: option }))}
      placeholder={{}}
      touchableWrapperProps={{ activeOpacity: undefined }}>
      {children}
    </RNPickerSelect>
  );
};

export default ActionPicker;
