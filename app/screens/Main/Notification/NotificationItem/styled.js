import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 19px;
  padding-vertical: 20px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;
