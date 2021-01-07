import styled from 'styled-components/native';

import { Box, Image } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { personalBackground } from '~/resources';
import { hitSlopArea } from '~/utils/utils';
import { Metrics } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const BackgroundImage = styled(Image).attrs({
  source: personalBackground,
})`
  height: 130px;
`;
