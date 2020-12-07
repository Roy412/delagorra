import styled from 'styled-components/native';
import { SafeAreaView, StatusBar as StatusBarUI } from 'react-native';
import { color } from 'styled-system';

import { backIcon } from '~/resources';
import { Box, Text, IconButton } from '~/components/ui';

export const Container = styled(SafeAreaView)`
  overflow: hidden;
`;

export const Content = styled(Box).attrs({
  flexDirection: 'row',
  alignItems: 'center',
  height: 44,
})``;

export const StatusBar = styled(StatusBarUI)`
  ${color}
`;

export const Title = styled(Text).attrs({
  fontSize: 17,
  fontStyle: 'semibold',
  numberOfLines: 1,
  textAlign: 'center',
  flex: 1,
})``;

export const Left = styled(Box).attrs({
  width: 60,
})``;

export const Right = styled(Left).attrs({})``;

export const BackButton = styled(IconButton).attrs({
  source: backIcon,
  hitSlop: 5,
})``;
