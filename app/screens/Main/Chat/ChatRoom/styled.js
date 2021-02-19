import styled from 'styled-components/native';
import { GiftedChat as GiftedChatUI } from 'react-native-gifted-chat';
import { ActivityIndicator as ActivityIndicatorUI } from 'react-native';

import CommentItemUI from './CommentItem';
import { Colors, Metrics } from '~/utils/theme';
import { IconButton } from '~/components/ui';
import { hitSlopArea } from '~/utils/utils';
import { crossIcon } from '~/resources';

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

export const ReplyCommentItem = styled(CommentItemUI).attrs({
  noReply: true,
})`
  background-color: white;
`;

export const CloseButton = styled(IconButton).attrs({
  source: crossIcon,
  hitSlop: hitSlopArea(5),
  pr: 17,
  tintColor: 'white',
  iconStyle: { width: 18, aspectRatio: 60 / 66, height: undefined },
})``;
