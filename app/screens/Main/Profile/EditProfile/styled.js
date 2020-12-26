import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Button, Image, Box, ActionPicker as ActionPickerUI } from '~/components/ui';
import { nextIcon, profileImage, cameraIcon } from '~/resources';

export { Text, Box, Button, IconButton, Loader } from '~/components/ui';
export { FocusAwareStatusBar } from '~/components/headers';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const RightButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'white', fontStyle: 'regular', fontSize: 17 },
  pr: 15,
})`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { backgroundColor: 'white', marginTop: 5 },
})`
  flex: 1;
`;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 13px;
`;

export const RightArrow = styled(Image).attrs({
  source: nextIcon,
  tintColor: 'veryDarkGray',
})`
  width: 9px;
  aspect-ratio: ${7 / 12};
  opacity: 0.2;
`;

export const Separator = styled(Box).attrs({
  bg: 'grayishBlue',
  ml: 16,
})`
  height: 1px;
`;

export const ProfileImage = styled(Image).attrs((props) => ({
  source: props.source || profileImage,
}))`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  align-self: center;
`;

export const CameraIcon = styled(Image).attrs({
  source: cameraIcon,
})`
  position: absolute;
  width: 32px;
  height: 26px;
`;

export const ActionPicker = styled(ActionPickerUI)`
  margin-vertical: 30px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
