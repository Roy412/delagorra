import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { gearIcon, nextIcon } from '~/resources';
import { IconButton, Image, Box } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Button, IconButton, AvatarPicker } from '~/components/ui';

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

export const LevelText = styled(Box)`
  background-color: #1499fa;
  border-radius: 18px;
  margin-left: 7px;
  padding-horizontal: 8px;
  padding-vertical: 2px;
`;
