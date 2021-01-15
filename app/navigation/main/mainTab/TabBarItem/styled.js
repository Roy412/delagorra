import styled from 'styled-components/native';

import { Metrics } from '~/utils/theme';
import { Box, Text, Image } from '~/components/ui';

export const Container = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Image)`
  width: ${(props) => props.width}px;
  aspect-ratio: ${(props) => props.aspectRatio};
  height: undefined;
`;

export const Badge = styled(Box).attrs({
  bg: 'deepBlush',
})`
  position: absolute;
  top: 4px;
  right: ${Metrics.screenWidth / 6 - 25}px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const BadgeText = styled(Text).attrs({
  fontSize: 10,
  fontStyle: 'semibold',
  color: 'white',
})`
  text-align: center;
`;
