import React, { useCallback } from 'react';
import { parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { timeSince } from '~/utils/utils';
import { navigators } from '~/navigation/routeNames';
import { ChatCreators } from '~/store/actions/chat';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';

import * as Styled from './styled';

const LobbyItem = ({ item, onPress }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

      <Styled.Box alignItems="flex-end">
        {strSince && (
          <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
            {strSince}
          </Styled.Text>
        )}
        {item.countUnread && (
          <Styled.UnreadWrapper mt={6} bg="pink" height={20}>
            <Styled.Text color="white" fontStyle="semiBold" fontSize={14}>
              {item.countUnread}
            </Styled.Text>
          </Styled.UnreadWrapper>
        )}
      </Styled.Box>
    </Styled.Container>
  );
};

export default LobbyItem;
