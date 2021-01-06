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

const PostActionItem = ({ source, text }) => (
  <Styled.Box flexDirection="row" alignItems="center">
    <Styled.Image source={source} />
    <Styled.Text>{text}</Styled.Text>
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
    <Styled.Item bg="white">
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
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
    />
  );
};

export default PostList;
