import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.background};
`;
