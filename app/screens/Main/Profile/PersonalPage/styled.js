import styled from 'styled-components/native';

import { Box, IconButton, Image, Button, Loader as LoaderUI, ActionPicker as ActionPickerUI } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { personalBackground, backIcon, profileMessage, profilePicture } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Image, AvatarCircle, Button } from '~/components/ui';
export { LevelBox } from '~/components/blocks';
export { SimpleHeader } from '~/components/headers';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${Colors.white};
`;

export const BackgroundImage = styled(Image).attrs((props) => ({
  source: props.source || personalBackground,
}))`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

export const Header = styled(Box)``;

export const RightButton = styled(IconButton).attrs({
  source: profileMessage,
  hitSlop: hitSlopArea(5),
  size: 26,
  pr: 17,
})``;

export const BackButton = styled(IconButton).attrs({
  source: backIcon,
  hitSlop: hitSlopArea(5),
  pl: 17,
  iconStyle: { width: 12, aspectRatio: 10 / 17, height: undefined },
  tintColor: 'white',
})``;

export const AvatarWrapper = styled(Box)`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: white;
  align-items: center;
  justify-content: center;
  top: -40px;
  left: 16px;
`;

export const PointBox = styled(Box).attrs({
  bg: 'pink',
})`
  width: ${(props) => (props.point / props.maxPoint) * 100}%;
  height: 15px;
`;

export const BtnEditProfile = styled(Button).attrs((props) => ({
  variant: 'outlined',
  text: props.isMine ? 'Edit profile' : props.follow ? 'Following' : 'Follow',
  py: 5,
  textProps: {
    color: !props.isMine && !props.follow ? 'white' : 'veryDarkGray',
    fontStyle: 'regular',
    fontSize: 13,
  },
}))`
  border-radius: 3px;
  width: 86px;
  ${(props) => (props.isMine || props.follow) && 'border-color: rgba(0, 0, 0, 0.2);'};
  ${(props) => !props.isMine && !props.follow && `background-color: ${Colors.pink};`}
`;

export const Loader = styled(LoaderUI)`
  ${(props) => props.grayBackground && `background-color: ${Colors.background};`}
`;

export const PictureImage = styled(Image).attrs({
  source: profilePicture,
  size: 26,
})``;

export const ActionPicker = styled(ActionPickerUI)`
  margin-right: 17px;
`;
