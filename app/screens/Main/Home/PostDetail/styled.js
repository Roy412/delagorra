import styled from 'styled-components/native';

import { IconButton, Image } from '~/components/ui';
import { Colors } from '~/utils/theme';
import { dotsIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';
import { Metrics } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;

