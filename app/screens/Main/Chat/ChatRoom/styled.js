import styled from 'styled-components/native';
import { GiftedChat as GiftedChatUI } from 'react-native-gifted-chat';

import { Colors } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.white};
`;

export const GiftedChat = styled(GiftedChatUI).attrs({
  messagesContainerStyle: { backgroundColor: Colors.background },
})``;
