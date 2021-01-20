import styled from 'styled-components/native';
import { GiftedChat as GiftedChatUI } from 'react-native-gifted-chat';
import { ActivityIndicator as ActivityIndicatorUI } from 'react-native';

import { Colors, Metrics } from '~/utils/theme';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';
export CommentItem from './CommentItem';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.white};
`;

export const GiftedChat = styled(GiftedChatUI).attrs((props) => ({
  messagesContainerStyle: { backgroundColor: props.messages.length === 0 ? 'transparent' : Colors.background },
  bottomOffset: Metrics.bottomSpace,
}))``;

export const ActivityIndicator = styled(ActivityIndicatorUI)`
  margin-top: 20px;
`;
