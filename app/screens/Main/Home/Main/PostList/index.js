import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';
import { posts as postsSelector, profilePosts as profilePostsSelector } from '~/store/selectors/post';
import { showSimpleError } from '~/utils/alert';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { navigators, home } from '~/navigation/routeNames';

import * as Styled from './styled';

const PostList = ({ onUnAuth, profileId, ...props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const posts = useSelector(postsSelector);
  const profilePosts = useSelector(profilePostsSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const [isRefreshing, setIsRefreshing] = useState();
  const [loading, setLoading] = useState(true);
  const [lastPostId, setLastPostId] = useState();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (profileId) {
      dispatch(PostCreators.getPostsSuccess({ posts: [], profileId, isRefresh: true }));
    }
    handleLoadMore(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
  };

  const fetchPosts = async (lastId) => {
    try {
      const response = await Promisify(dispatch, PostCreators.getPostsRequest, { lastId, profileId });
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

  const handlePressItem = (item) => {
    if (!isAuthenticated) {
      return onUnAuth();
    }
    navigation.push(navigators.mainNav, { screen: home.chatRoom, params: { postId: item._id, type: 'post' } });
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => <Styled.PostItem item={item} onPress={handlePressItem} />;

  const renderEmpty = () =>
    !hasMore && (
      <Styled.Text textAlign="center" mt={20} fontSize={15} fontStyle="medium">
        No Posts
      </Styled.Text>
    );

  return (
    <Styled.List
      data={profileId ? profilePosts : posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
      bounces={!loading}
      {...props}
    />
  );
};

export default PostList;
