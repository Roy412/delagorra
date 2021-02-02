import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';
import { showSimpleError } from '~/utils/alert';
import { rooms as roomsSelector } from '~/store/selectors/chat';
import { home } from '~/navigation/routeNames';

import * as Styled from './styled';

const ChatLobby = ({ navigation }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const rooms = useSelector(roomsSelector);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      await Promisify(dispatch, ChatCreators.getRoomsRequest, {});
      setLoading(false);
    } catch (e) {
      showSimpleError(e);
    }
  };

  const handlePressItem = (item) => {
    navigation.push(home.chatRoom, { otherUserId: item.otherUser._id, type: 'chat' });
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => <Styled.LobbyItem item={item} onPress={handlePressItem} />;

  const renderEmpty = () =>
    !loading &&
    rooms.length === 0 && (
      <Styled.Text textAlign="center" mt={20} fontSize={15} fontStyle="medium">
        No Rooms
      </Styled.Text>
    );

  const renderSeparator = () => <Styled.Box height={1} bg="grayishBlue" mx={16} />;

  return (
    <Styled.List
      data={rooms}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListFooterComponent={renderFooter}
      bounces={!loading}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

export default ChatLobby;
