import React from 'react';
import { parseISO } from 'date-fns';

import { timeSince } from '~/utils/utils';

import * as Styled from './styled';

const LobbyItem = ({ item, onPress }) => {
  const handleAvatarPress = () => {
    // navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const strSince = timeSince(parseISO(item.lastMessage.createdAt), ' ago');

  return (
    <Styled.Container onPress={() => onPress(item)}>
      <Styled.AvatarCircle url={item.otherUser.avatar} size={35} onPress={handleAvatarPress} />
      <Styled.Box flex={1} ml={15}>
        <Styled.Text color="veryDarkGray" fontSize={16}>
          {item.otherUser.displayName}
        </Styled.Text>

        <Styled.Text mt={6} color="veryDarkGray" fontSize={15}>
          {item.lastMessage.text}
        </Styled.Text>
      </Styled.Box>

      <Styled.Box alignItems="flex-end" alignSelf="flex-start" mt={4}>
        {strSince && (
          <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
            {strSince}
          </Styled.Text>
        )}
        <Styled.Badge mt={6} value={item.countUnread} />
      </Styled.Box>
    </Styled.Container>
  );
};

export default LobbyItem;
