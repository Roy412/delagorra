import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  padding-right: 19px;
  padding-vertical: 20px;
  background-color: ${(props) => (props.isRead ? Colors.background : 'rgba(19,19,19,0.05)')};
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 5 },
})`
  flex: 1;
  background-color: ${Colors.background};
`;
