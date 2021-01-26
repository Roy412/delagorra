import React, { useCallback } from 'react';
import { parseISO } from 'date-fns';
import { useDispatch} from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { timeSince } from '~/utils/utils';
import { navigators } from '~/navigation/routeNames';
import { ChatCreators } from '~/store/actions/chat';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';

import * as Styled from './styled';

const CommentItem = ({ currentMessage, style, roomId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAvatarPress = () => {
    // navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const handlePostOption = () => {};

  const handlePress = () => {};

  const handleReply = () => {
    navigation.push(navigators.replyRoom, { type: 'post', comment: currentMessage, post: null, otherUserId: null });
  };

  const strSince = timeSince(parseISO(currentMessage.createdAt));

  const handleLikeDebounced = useCallback(
    _.debounce(async (likeValue) => {
      try {
        await Promisify(dispatch, ChatCreators.messageLikeRequest, {
          roomId,
          like: likeValue,
          msgId: currentMessage._id,
        });
      } catch (e) {
        showSimpleError(e);
      } finally {
      }
    }, 100),
    [],
  );

  const handleLike = (value) => {
    if (value !== currentMessage.like) {
      dispatch(
        ChatCreators.messageLikeSuccess({
          msgId: currentMessage._id,
          roomId,
          like: value,
          totalLikes: currentMessage.totalLikes + (currentMessage.like === 0 ? value : value * 2),
        }),
      );
      handleLikeDebounced(value);
    }
  };

  return (
    <Styled.Container onPress={handlePress}>
      <Styled.Box style={style} pt={18} px={16} pb={10}>
        <Styled.Box flexDirection="row">
          <Styled.AvatarCircle url={currentMessage.user.avatar} size={35} onPress={handleAvatarPress} />
          <Styled.Box flex={1} ml={10}>
            <Styled.Box alignItems="center" flexDirection="row">
              <Styled.Box flex={1} justifyContent="center">
                <Styled.Box alignItems="center" flexDirection="row">
                  <Styled.Text fontStyle="semibold" color="rgba(19,19,19,0.6)">
                    {currentMessage.user.displayName}
                  </Styled.Text>
                  <Styled.LevelBox level={currentMessage.user.level} />
                </Styled.Box>
                {strSince && (
                  <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
                    {timeSince(parseISO(currentMessage.createdAt))}
                  </Styled.Text>
                )}
              </Styled.Box>
              <Styled.OptionButton onPress={handlePostOption} />
            </Styled.Box>

            {!!currentMessage.text && (
              <Styled.Text mt={16} mb={10}>
                {currentMessage.text}
              </Styled.Text>
            )}

            <Styled.Box flexDirection="row" alignItems="center" justifyContent="space-between">
              <Styled.ReplyContainer onPress={handleReply}>
                <Styled.CommentIcon />
                <Styled.Text color="darkGray" fontSize={14} fontStyle="semiBold" ml={5}>
                  {currentMessage.replyCount ? `Replies ${currentMessage.replyCount}` : 'Reply'}
                </Styled.Text>
              </Styled.ReplyContainer>

              <Styled.Box flexDirection="row" alignItems="center">
                <Styled.LikeButton onPress={() => handleLike(1)} active={currentMessage.like === 1} />

                <Styled.Text width={40} color="rgba(0,0,0,0.25)" fontStyle="medium" textAlign="center">
                  {currentMessage.totalLikes}
                </Styled.Text>

                <Styled.LikeButton onPress={() => handleLike(-1)} active={currentMessage.like === -1} unLike />
              </Styled.Box>
            </Styled.Box>
          </Styled.Box>
        </Styled.Box>
      </Styled.Box>
    </Styled.Container>
  );
};

export default CommentItem;
