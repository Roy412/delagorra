import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { crossIcon, pictureIcon } from '~/resources';
import { IconButton, Button, TextInput } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Button, IconButton, TextInput, Loader } from '~/components/ui';

export const Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const CloseButton = styled(IconButton).attrs({
  source: crossIcon,
  hitSlop: hitSlopArea(5),
  pl: 17,
  tintColor: 'pink',
  iconStyle: { width: 18, aspectRatio: 60 / 66, height: undefined },
})``;

export const RightButton = styled(Button).attrs((props) => ({
  variant: 'text',
  textProps: { color: props.disabled ? 'veryDarkGray' : 'pink', fontStyle: 'regular', fontSize: 17 },
  pr: 15,
}))`
  flex: 1;
`;

export const TitleInput = styled(TextInput).attrs({
  inputContainerStyle: { backgroundColor: 'transparent', height: 'auto', paddingBottom: 10 },
})``;

export const ContentInput = styled(TitleInput).attrs({})`
  margin-top: 20px;
`;

export const PictureButton = styled(IconButton).attrs({
  source: pictureIcon,
  hitSlop: hitSlopArea(5),
  iconStyle: { width: 25, aspectRatio: 100 / 80, height: undefined },
})``;
