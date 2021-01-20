import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';
import { getAllMessagesByRoomId } from '~/store/selectors/chat';
import { user as userSelector } from '~/store/selectors/session';

import * as Styled from './styled';
import PostItem from '../../Home/Main/PostItem';
import CommentsHeader from './CommentsHeader';

const ChatRoom = ({ route, navigation }) => {
  const { otherUserId, post, type, comment } = route.params || {};

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(userSelector);

  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const allMessagesByRoomId = useSelector(getAllMessagesByRoomId);

  useLayoutEffect(() => {
    if (type === 'chat' && room) {
      navigation.setOptions({ title: room.otherUser.displayName });
    }
    if (type === 'post') {
      navigation.setOptions({
        title: post ? post.creator.displayName : 'Replies',
        headerRight: !post && <Styled.CloseButton onPress={handleClose} />,
      });
    }
  }, [navigation, room]);

  useEffect(() => {
    // setTimeout(() => {
    fetchRoom();
    // }, 5000);
  }, []);

  useEffect(() => {
    if (room) {
      setLoading(false);
      setMessages(allMessagesByRoomId[room._id] || []);
    }
  }, [room, allMessagesByRoomId]);

  const fetchRoom = async () => {
    try {
      const result = await Promisify(dispatch, ChatCreators.getRoomRequest, {
        otherUserId,
        type,
        postId: post && post._id,
        commentId: comment && comment._id,
      });
      setRoom(result);
    } catch (e) {}
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const onSend = useCallback(
    (newMessages = []) => {
      _.forEach(newMessages, async (newMsg) => {
        try {
          await Promisify(dispatch, ChatCreators.chatSendRequest, { text: newMsg.text, roomId: room._id });
        } catch (e) {}
      });
    },
    [room],
  );

  const renderHeader = () => (
    <Styled.Box>
      {post ? <PostItem item={post} /> : <Styled.ReplyCommentItem currentMessage={comment} />}
      <CommentsHeader count={room && room.commentCount} title={post ? 'Comments' : 'Replies'} />
      {loading && <Styled.ActivityIndicator size="large" color="#0000aa" />}
    </Styled.Box>
  );

  if (type === 'chat' && loading) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.Box style={StyleSheet.absoluteFill} alignItems="center" pt={50} bg="background" mb={getBottomSpace()}>
        {messages.length === 0 && (
          <Styled.Text fontSize={17} textAlign="center">
            No conversations
          </Styled.Text>
        )}
      </Styled.Box>
      <Styled.GiftedChat
        renderMessage={type === 'post' && ((params) => <Styled.CommentItem {...params} />)}
        messages={messages}
        onSend={onSend}
        user={{ _id: user._id }}
        showUserAvatar
        inverted={type === 'chat'}
        scrollToBottom={type === 'chat'}
        keyboardShouldPersistTaps="handled"
        renderLoadEarlier={renderHeader}
        loadEarlier={type === 'post'}
      />
    </Styled.Container>
  );
};

export default ChatRoom;
