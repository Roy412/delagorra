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
});

export const StatusBar = styled(StatusBarUI)`
  ${color}
`;

export const Title = styled(Text).attrs({
  fontSize: 16,
  fontStyle: 'semibold',
  numberOfLines: 1,
  textAlign: 'center',
  flex: 1,
  lineHeight: 22,
})``;

export const Left = styled(Box).attrs({})``;

export const Right = styled(Box).attrs({})``;

export const BackButton = styled(IconButton).attrs({
  source: backIcon,
  hitSlop: 5,
})``;
