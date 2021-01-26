import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { timeSince } from '~/utils/utils';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { profile, navigators } from '~/navigation/routeNames';
import { PostCreators } from '~/store/actions/post';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';

import * as Styled from './styled';

const PostActionItem = ({ source, text, size, justifyContent, onPress, active }) => (
  <Styled.Box flexDirection="row" alignItems="center" flex={1} justifyContent={justifyContent}>
    <Styled.PostActionItem onPress={onPress}>
      <Styled.PostActionIcon size={size} source={source} active={active} />
      <Styled.Text ml={6} color={active ? 'pink' : 'rgba(0,0,0,0.25)'} fontStyle="medium">
        {text}
      </Styled.Text>
    </Styled.PostActionItem>
  </Styled.Box>
);

const PostItem = ({ item, onPress = _.noop, style }) => {
  const navigation = useNavigation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const handleAvatarPress = () => {
    navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const handlePostOption = () => {};

  const handleLikeDebounced = useCallback(
    _.debounce(async (likeValue) => {
      try {
        await Promisify(dispatch, PostCreators.postLikeRequest, { postId: item._id, like: likeValue });
      } catch (e) {
        showSimpleError(e);
      } finally {
      }
    }, 100),
    [],
  );

  const handleLike = () => {
    dispatch(
      PostCreators.postLikeSuccess({
        postId: item._id,
        like: !item.like,
        totalLikes: !item.like ? item.totalLikes + 1 : item.totalLikes - 1,
      }),
    );
    handleLikeDebounced(!item.like);
  };

  const handleShare = () => {

  }

  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <Styled.Box bg="white" style={style} pointerEvents={isAuthenticated ? 'auto' : 'box-only'}>
        <Styled.Box pt={18} px={16}>
          <Styled.Box flexDirection="row">
            <Styled.AvatarCircle url={item.creator.avatar} size={35} onPress={handleAvatarPress} />
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
          <PostActionItem
            source={likeIcon}
            text={item.totalLikes}
            size={25}
            justifyContent="flex-start"
            onPress={handleLike}
            active={item.like}
          />
          <PostActionItem source={commentIcon} text={0} size={20} justifyContent="center" onPress={() => onPress(item)} />
          <PostActionItem source={shareIcon} text={0} size={20} justifyContent="flex-end" onPress={handleShare} />
        </Styled.Box>
      </Styled.Box>
    </TouchableWithoutFeedback>
  );
};

export default PostItem;
