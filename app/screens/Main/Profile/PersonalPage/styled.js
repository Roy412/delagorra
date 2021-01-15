import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Box, IconButton } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { personalBackground, backIcon, profileMessage } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export { Text, Box, Loader, Image, AvatarCircle, Button } from '~/components/ui';
export { SimpleHeader } from '~/components/headers';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const BackgroundImage = styled.ImageBackground.attrs({
  source: personalBackground,
})`
  width: 100%;
  height: 130px;
  flex-direction: column;
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
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: white;
`;

export const PointBox = styled(Box)``;
