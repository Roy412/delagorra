import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { gearIcon, nextIcon } from '~/resources';
import { IconButton, Image, Box } from '~/components/ui';
import { Badge as BadgeUI } from '~/components/blocks';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Button, IconButton, AvatarCircle, ImageViewer } from '~/components/ui';

export const Content = styled(SafeAreaView)`
  flex: 1;
`;

export const GearButton = styled(IconButton).attrs({
  source: gearIcon,
  hitSlop: hitSlopArea(5),
  pr: 17,
  tintColor: 'white',
  size: 20,
})``;

export const RightArrow = styled(Image).attrs({
  source: nextIcon,
  tintColor: 'pink',
  ml: 12,
})`
  width: 8px;
  aspect-ratio: ${7 / 12};
`;

export const BtnPersnal = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
`;

export const LevelText = styled(Box).attrs({
  bg: 'vividBlue',
})`
  border-radius: 18px;
  margin-left: 7px;
  padding-horizontal: 8px;
  padding-vertical: 2px;
`;

export const BookmarkIcon = styled(Image).attrs((props) => ({
  source: props.icon,
}))`
  width: ${(props) => props.width}px;
  aspect-ratio: ${(props) => props.aspectRatio};
  height: undefined;
`;

export const BookmarkContainer = styled(Box).attrs({
  flexDirection: 'row',
  mt: 5,
  bg: 'white',
  pb: 10,
  pt: 13,
  alignItems: 'center',
  justifyContent: 'center',
  px: 20,
})``;

export const BookmarkIconWrapper = styled(Box).attrs({
  borderRadius: 21,
  width: 42,
  height: 42,
  bg: 'rgba(19,19,19,0.05)',
  alignItems: 'center',
  justifyContent: 'center',
})``;

export const BookmarkItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled(BadgeUI)`
  position: absolute;
  top: 0;
  right: 0;
`;
