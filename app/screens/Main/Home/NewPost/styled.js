import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { crossIcon, pictureIcon } from '~/resources';
import { IconButton, Button, TextInput, Image } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';
import PostImageUI from './PostImage';

export { Text, Box, Button, IconButton, TextInput, Loader, ActionPicker } from '~/components/ui';
export { FocusAwareStatusBar } from '~/components/headers';

export const Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

export const FormContainer = styled.ScrollView.attrs({
  contentContainerStyle: { paddingVertical: 20 },
  keyboardShouldPersistTaps: 'always',
})`
  flex: 1;
  background-color: #f4f4f4;
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
  fontStyle: 'semibold',
  inputContainerStyle: { backgroundColor: 'transparent', height: 'auto', paddingBottom: 10 },
  inputStyle: { maxHeight: 100 },
})``;

export const ContentInput = styled(TitleInput).attrs({
  fontStyle: 'regular',
  inputStyle: { maxHeight: 150 },
})`
  margin-top: 20px;
`;

export const PictureImage = styled(Image).attrs((props) => ({
  source: pictureIcon,
}))`
  width: 25px;
  aspect-ratio: ${100 / 80};
  height: ${'undefined'};
`;

export const PostImage = styled(PostImageUI)`
  width: 125px;
  height: 125px;
  margin-top: 10px;
`;
