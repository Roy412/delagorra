import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { parseISO, formatDistance } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { likeIcon, commentIcon, shareIcon } from '~/resources';
import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';
import { posts as postsSelector } from '~/store/selectors/post';
import { showSimpleError } from '~/utils/alert';

import * as Styled from './styled';

const PostActionItem = ({ source, text, size, justifyContent }) => (
  <Styled.Box flexDirection="row" alignItems="center" flex={1} justifyContent={justifyContent}>
    <Styled.PostActionIcon size={size} source={source} />
    <Styled.Text ml={6} color="rgba(19,19,19,0.25)" fontStyle="medium">
      {text}
    </Styled.Text>
  </Styled.Box>
);

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);

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

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => (
    <Styled.Box bg="white" mb={10}>
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

      <Styled.Box flexDirection="row" alignItems="center" px={16} py={10}>
        <PostActionItem source={likeIcon} text={0} size={25} justifyContent="flex-start" />
        <PostActionItem source={commentIcon} text={0} size={20} justifyContent="center" />
        <PostActionItem source={shareIcon} text={0} size={20} justifyContent="flex-end" />
      </Styled.Box>
    </Styled.Box>
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
