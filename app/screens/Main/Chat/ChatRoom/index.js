import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';
import { PostCreators } from '~/store/actions/post';
import { getAllMessagesByRoomId } from '~/store/selectors/chat';
import { user as userSelector } from '~/store/selectors/session';
import { convertToTimeString } from '~/utils/utils';
import { sharing as sharingSelector } from '~/store/selectors/post';

import * as Styled from './styled';
import PostItem from '../../Home/Main/PostItem';

const ChatRoom = ({ route, navigation }) => {
  const { otherUserId, post, type, comment, prevRoomId } = route.params || {};

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(userSelector);
  const postSharing = useSelector(sharingSelector);

  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [sortMode, setSortMode] = useState('new');
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
    if (room) {
      dispatch(ChatCreators.setActiveRoomIdSuccess(room._id));
      setLoading(false);
      const result = allMessagesByRoomId[room._id] || [];
      setMessages(result);
      if (result[0]) {
        dispatch(ChatCreators.readMessageRequest({ roomId: room._id, message: result[0] }));
      }
    }
  }, [room, JSON.stringify(allMessagesByRoomId)]);

  useEffect(() => {
    handleRefresh();
  }, [sortMode]);

  const handleRefresh = () => {
    setLoading(true);
    setMessages([]);
    fetchRoom();
  };

  const fetchRoom = async () => {
    try {
      const result = await Promisify(dispatch, ChatCreators.getRoomRequest, {
        otherUserId,
        type,
        postId: post && post._id,
        commentId: comment && comment._id,
        commentSortMode: sortMode,
      });
      setRoom(result);
    } catch (e) {}
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const onSend = useCallback(
    (newMessages = []) => {
      let postId;
      if (type === 'post') {
        if (post) {
          postId = post._id;
        } else {
          postId = comment && comment.post._id;
        }
      }
      _.forEach(newMessages, async (newMsg) => {
        try {
          await Promisify(dispatch, ChatCreators.chatSendRequest, {
            text: newMsg.text,
            roomId: room._id,
            roomType: type === 'chat' ? 'chat' : 'comment',
            postId,
            isReplyRoom: type === 'post' && !post,
          });
        } catch (e) {}
      });
      if (type === 'post') {
        if (!post) {
          if (prevRoomId) {
            dispatch(
              ChatCreators.updateMessageSuccess(prevRoomId, comment._id, { replyCount: (comment.replyCount || 0) + 1 }),
            );
          }
        } else {
          PostCreators.postUpdateStatusSuccess({
            postId: post._id,
            status: { totalComments: (post.totalComments || 0) + 1 },
          });
        }
      }
    },
    [room],
  );

  const renderHeader = () => (
    <Styled.Box>
      {post ? <PostItem item={post} bookmarkEnabled /> : <Styled.ReplyCommentItem currentMessage={comment} />}
      <Styled.SortPanel
        onSort={setSortMode}
        sortMode={sortMode}
        count={room && room.commentCount}
        title={post ? 'Comments' : 'Replies'}
        type="comment"
      />
      {loading && <Styled.ActivityIndicator size="large" color="#0000aa" />}
    </Styled.Box>
  );

  const renderSeparator = () => type === 'post' && <Styled.Box height={1} bg="rgba(19,19,19,0.07)" ml={16} />;

  const renderDayTime = ({ currentMessage, nextMessage }) => {
    const timeString = convertToTimeString(currentMessage.createdAt);
    if (nextMessage && nextMessage.createdAt) {
      if (timeString === convertToTimeString(nextMessage.createdAt)) {
        return null;
      }
    }
    return (
      <Styled.Text my={5} textAlign="center" color="#898A8D">
        {timeString}
      </Styled.Text>
    );
  };

  const renderBubble = ({ containerStyle, onMessageLayout, ...props }) => <Styled.Bubble {...props} />;

  if (type === 'chat' && loading) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.Box style={StyleSheet.absoluteFill} alignItems="center" pt={50} bg="background" mb={getBottomSpace()}>
        {!loading && messages.length === 0 && (
          <Styled.Text fontSize={17} textAlign="center">
            No conversations
          </Styled.Text>
        )}
      </Styled.Box>
      <Styled.GiftedChat
        renderMessage={type === 'post' ? (params) => <Styled.CommentItem {...params} roomId={room._id} /> : undefined}
        messages={messages}
        onSend={onSend}
        user={{ _id: user._id }}
        showUserAvatar
        inverted={type === 'chat'}
        scrollToBottom={type === 'chat'}
        keyboardShouldPersistTaps="handled"
        renderLoadEarlier={renderHeader}
        loadEarlier={type === 'post'}
        listViewProps={{ ItemSeparatorComponent: renderSeparator }}
        renderTime={() => null}
        renderDay={renderDayTime}
        renderBubble={renderBubble}
        textInputProps={{ autoFocus: type === 'post' && !post }}
      />

      <Styled.Loader loading={postSharing} />
    </Styled.Container>
  );
};

export default ChatRoom;
