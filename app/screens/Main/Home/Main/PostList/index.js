import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';
import { posts as postsSelector } from '~/store/selectors/post';
import { showSimpleError } from '~/utils/alert';
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

const PostList = ({ onUnAuth }) => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const [isRefreshing, setIsRefreshing] = useState();
  const [loading, setLoading] = useState(true);
  const [lastPostId, setLastPostId] = useState();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleLoadMore(true);
  }, []);

  const handleAvatarPress = () => {};

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  const fetchPosts = async (lastId) => {
    try {
      const response = await Promisify(dispatch, PostCreators.getPostsRequest, { lastId });
      if (response.posts.length < 1) {
        setHasMore(false);
      } else {
        setLastPostId(response.lastId);
      }
    } catch (e) {
      showSimpleError(e);
    }
  };

  const handleLoadMore = async (isInitial) => {
    if (!hasMore || (loading && !isInitial)) {
      return;
    }
    setLoading(true);
    await fetchPosts(lastPostId);
    setLoading(false);
  };

  const handlePostOption = () => {};

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={onUnAuth}>
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

  return (
    <Styled.List
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
    />
  );
};

export default PostList;
