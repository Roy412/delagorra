import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;