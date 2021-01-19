import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { timeSince } from '~/utils/utils';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { profile, navigators } from '~/navigation/routeNames';

import * as Styled from './styled';

const PostActionItem = ({ source, text, size, justifyContent }) => (
  <Styled.Box flexDirection="row" alignItems="center" flex={1} justifyContent={justifyContent}>
    <Styled.PostActionIcon size={size} source={source} />
    <Styled.Text ml={6} color="rgba(19,19,19,0.25)" fontStyle="medium">
      {text}
    </Styled.Text>
  </Styled.Box>
);

const CommentItem = ({ currentMessage }) => {
  const navigation = useNavigation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleAvatarPress = () => {
    navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const handlePostOption = () => {};

  const handlePress = () => {};

  const handleReply = () => {};

  return (
    <Styled.Container onPress={handlePress}>
      <Styled.Box pt={18} px={16}>
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
                <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
                  {timeSince(parseISO(currentMessage.createdAt))}
                </Styled.Text>
              </Styled.Box>
              <Styled.OptionButton onPress={handlePostOption} />
            </Styled.Box>

            {!!currentMessage.text && (
              <Styled.Text mt={16} mb={10}>
                {currentMessage.text}
              </Styled.Text>
            )}

            <Styled.ReplyContainer onPress={handleReply}>
              <Styled.CommentIcon />
              <Styled.Text color="darkGray" fontSize={14} fontStyle="semiBold" ml={4}>
                {currentMessage.replyCount ? `Replies ${currentMessage.replyCount}` : 'Reply'}
              </Styled.Text>
            </Styled.ReplyContainer>
          </Styled.Box>
        </Styled.Box>

        {/*<Styled.Text mt={18}>{item.title}</Styled.Text>*/}
      </Styled.Box>

      {/*{item.image && <Styled.PostImage mt={16} source={{ uri: item.image }} />}*/}

      {/*<Styled.Box flexDirection="row" alignItems="center" px={16} py={10}>*/}
      {/*  <PostActionItem source={likeIcon} text={0} size={25} justifyContent="flex-start" />*/}
      {/*  <PostActionItem source={commentIcon} text={0} size={20} justifyContent="center" />*/}
      {/*  <PostActionItem source={shareIcon} text={0} size={20} justifyContent="flex-end" />*/}
      {/*</Styled.Box>*/}
    </Styled.Container>
  );
};

export default CommentItem;
