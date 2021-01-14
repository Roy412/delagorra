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

const ChatRoom = ({ route, navigation }) => {
  const { otherUserId } = route.params || {};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(userSelector);

  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const allMessagesByRoomId = useSelector(getAllMessagesByRoomId);

  useLayoutEffect(() => {
    if (room) {
      navigation.setOptions({ title: room.otherUser.displayName });
    }
  }, [navigation, room]);

  useEffect(() => {
    if (otherUserId) {
      fetchRoom();
    }
  }, []);

  useEffect(() => {
    if (room) {
      setLoading(false);
      setMessages(allMessagesByRoomId[room._id] || []);
    }
  }, [room, allMessagesByRoomId]);

  const fetchRoom = async () => {
    try {
      const result = await Promisify(dispatch, ChatCreators.getRoomRequest, { otherUserId });
      setRoom(result);
    } catch (e) {}
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

  if (loading) {
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
      <Styled.GiftedChat messages={messages} onSend={onSend} user={{ _id: user._id }} showUserAvatar />
    </Styled.Container>
  );
};

export default ChatRoom;
