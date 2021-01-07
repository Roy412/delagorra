import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { timeSince } from '~/utils/utils';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const PostActionItem = ({ source, text, size, justifyContent }) => (
  <Styled.Box flexDirection="row" alignItems="center" flex={1} justifyContent={justifyContent}>
    <Styled.PostActionIcon size={size} source={source} />
    <Styled.Text ml={6} color="rgba(19,19,19,0.25)" fontStyle="medium">
      {text}
    </Styled.Text>
  </Styled.Box>
);

const PostItem = ({ item, onPress = _.noop }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleAvatarPress = () => {};

  const handlePostOption = () => {};

  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <Styled.Box bg="white" mb={10} pointerEvents={isAuthenticated ? 'auto' : 'box-only'}>
        <Styled.Box pt={18} px={16}>
          <Styled.Box flexDirection="row">
            <Styled.AvatarCircle url={item.creator.profileImage} size={35} onPress={handleAvatarPress} />
            <Styled.Box flex={1} ml={10} justifyContent="center">
              <Styled.Text fontStyle="semibold" color="rgba(19,19,19,0.6)">
                {item.creator.displayName}
              </Styled.Text>
              <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
                {timeSince(parseISO(item.createdAt))}
              </Styled.Text>
            </Styled.Box>
            <Styled.OptionButton onPress={handlePostOption} />
          </Styled.Box>

          <Styled.Text mt={18}>{item.title}</Styled.Text>
          {!!item.description && (
            <Styled.Text mt={16} mb={10}>
              {item.description}
            </Styled.Text>
          )}
        </Styled.Box>

        {item.image && <Styled.PostImage mt={16} source={{ uri: item.image }} />}

        <Styled.Box flexDirection="row" alignItems="center" px={16} py={10}>
          <PostActionItem source={likeIcon} text={0} size={25} justifyContent="flex-start" />
          <PostActionItem source={commentIcon} text={0} size={20} justifyContent="center" />
          <PostActionItem source={shareIcon} text={0} size={20} justifyContent="flex-end" />
        </Styled.Box>
      </Styled.Box>
    </TouchableWithoutFeedback>
  );
};

export default PostItem;