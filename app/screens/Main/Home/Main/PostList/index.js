import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { parseISO, formatDistance } from 'date-fns';
import { useDispatch } from 'react-redux';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';

import * as Styled from './styled';

const PostActionItem = ({ source, text }) => (
  <Styled.Box flexDirection="row" alignItems="center">
    <Styled.Image source={source} />
    <Styled.Text>{text}</Styled.Text>
  </Styled.Box>
);

const PostList = ({ posts }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState();

  const handleAvatarPress = () => {};

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await Promisify(dispatch, PostCreators.requestCodeRequest, { phoneNumber: values.phoneNumber });
      setCodeSending(false);
      startCountdown();
    } catch (e) {
      showSimpleError(e);
      setCodeSending(false);
    }
  };

  const renderItem = ({ item }) => (
    <Styled.Item>
      <Styled.Box flexDirection="row">
        <Styled.AvatarCircle url={item.creator.profileImage} size={35} onPress={handleAvatarPress} />
        <Styled.Box>
          <Styled.Text>{item.creator.displayName}</Styled.Text>
          <Styled.Text>{formatDistance(parseISO(item.createdAt), new Date())}</Styled.Text>
        </Styled.Box>
      </Styled.Box>

      <Styled.Text>{item.title}</Styled.Text>
      {item.description && <Styled.Text>{item.description}</Styled.Text>}

      {item.image && <Styled.PostImage source={{ uri: item.image }} />}

      <Styled.Box flexDirection="row" alignItems="center">
        <PostActionItem source={likeIcon} text={0} />
        <PostActionItem source={commentIcon} text={0} />
        <PostActionItem source={shareIcon} text={0} />
      </Styled.Box>
    </Styled.Item>
  );

  return (
    <Styled.List
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
    />
  );
};

export default PostList;
