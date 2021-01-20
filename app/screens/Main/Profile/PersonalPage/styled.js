import styled from 'styled-components/native';

import { Box, IconButton, Image, Button } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { personalBackground, backIcon, profileMessage } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle, Button } from '~/components/ui';
export { LevelBox } from '~/components/blocks';
export { SimpleHeader } from '~/components/headers';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${Colors.white};
`;

export const BackgroundImage = styled(Image).attrs({
  source: personalBackground,
})`
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

export const BtnEditProfile = styled(Button).attrs({
  variant: 'outlined',
  text: 'Edit profile',
  py: 5,
  px: 13,
  textProps: { color: 'veryDarkGray', fontStyle: 'regular', fontSize: 13 },
})`
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.2);
`;
