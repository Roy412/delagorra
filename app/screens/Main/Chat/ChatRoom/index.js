import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';

import * as Styled from './styled';

const ChatRoom = ({ route, navigation }) => {
  const { otherUser } = route.params || {};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState()

  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: otherUser.displayName,
    });
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) => Styled.GiftedChat.append(previousMessages, newMessages));

    _.forEach(newMessages, async (newMsg) => {
      try {
        await Promisify(dispatch, ChatCreators.chatSendRequest, {
          text: newMsg,
          roomId: room._id,
        });
      } catch (e) {}
    });
  }, []);

  if (loading) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.GiftedChat messages={messages} onSend={onSend} user={{ _id: 1 }} loadEarlier />
    </Styled.Container>
  );
};

export default ChatRoom;
