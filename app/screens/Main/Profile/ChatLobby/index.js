import React from 'react';
import { useSelector } from 'react-redux';

import { rooms as roomsSelector } from '~/store/selectors/chat';
import { home } from '~/navigation/routeNames';

import * as Styled from './styled';

const ChatLobby = ({ navigation }) => {
  const rooms = useSelector(roomsSelector);

  const handlePressItem = (item) => {
    navigation.push(home.chatRoom, { otherUserId: item.otherUser._id, type: 'chat' });
  };

  const renderItem = ({ item }) => <Styled.LobbyItem item={item} onPress={handlePressItem} />;

  const renderSeparator = () => <Styled.Box height={1} bg="grayishBlue" mx={16} />;

  return (
    <Styled.List
      data={rooms}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

export default ChatLobby;
