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

const PersonalCommentItem = ({ item, style }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAvatarPress = () => {
    // navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const handleReply = () => {
    navigation.push(navigators.replyRoom, { type: 'post', comment: item, post: null, otherUserId: null });
  };

  const strSince = timeSince(parseISO(item.createdAt));

  const handleLikeDebounced = useCallback(
    _.debounce(async (likeValue) => {
      try {
        await Promisify(dispatch, ChatCreators.messageLikeRequest, {
          roomId: item.room,
          like: likeValue,
          msgId: item._id,
        });
      } catch (e) {
        showSimpleError(e);
      } finally {
      }
    }, 100),
    [],
  );

  const handleLike = (value) => {
    if (value !== item.like) {
      dispatch(
        ChatCreators.messageLikeSuccess({
          msgId: item._id,
          roomId: item.room,
          like: value,
          totalLikes: item.totalLikes + (item.like === 0 ? value : value * 2),
        }),
      );
      handleLikeDebounced(value);
    }
  };

  return (
    <Styled.Box bg="white" flexDirection="row" style={style} pt={18} pl={16} pr={7} pb={10}>
      <Styled.AvatarCircle url={item.user.avatar} size={35} onPress={handleAvatarPress} />
      <Styled.Box flex={1} ml={10}>
        <Styled.Box alignItems="center" flexDirection="row">
          <Styled.Box flex={1} justifyContent="center">
            <Styled.Box alignItems="center" flexDirection="row">
              <Styled.Text fontStyle="semibold" color="rgba(19,19,19,0.6)">
                {item.user.displayName}
              </Styled.Text>
              <Styled.LevelBox level={item.user.level} py={0} px={10} fontSize={12} />
            </Styled.Box>
            {strSince && (
              <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
                {timeSince(parseISO(item.createdAt))}
              </Styled.Text>
            )}
          </Styled.Box>
          <Styled.Box flexDirection="row" alignItems="center">
            <Styled.LikeButton onPress={() => handleLike(1)} active={item.like === 1} />

            <Styled.Text width={40} color="rgba(0,0,0,0.25)" fontStyle="medium" textAlign="center">
              {item.totalLikes}
            </Styled.Text>
          </Styled.Box>
        </Styled.Box>

        {!!item.text && (
          <Styled.Text mt={16} mb={10}>
            {item.text}
          </Styled.Text>
        )}

        <Styled.ReplyContainer onPress={handleReply} disabled>
          <Styled.Text fontStyle="semiBold" color="rgba(19,19,19,0.4)" fontSize={15}>
            Replied to:
          </Styled.Text>
          <Styled.Text color="veryDarkGray" fontSize={15} fontStyle="semiBold">
            {item.post.title}
          </Styled.Text>
        </Styled.ReplyContainer>
      </Styled.Box>
    </Styled.Box>
  );
};

export default PersonalCommentItem;
