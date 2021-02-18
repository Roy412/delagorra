import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';
import { posts as postsSelector, searchPosts as searchPostsSelector } from '~/store/selectors/post';
import { showSimpleError } from '~/utils/alert';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { navigators, home } from '~/navigation/routeNames';

import * as Styled from './styled';

const PostList = forwardRef(({ onUnAuth, profileId, type, searchKeyword, isVisible = true, ...props }, ref) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const postsArray = useSelector(type === 'search' ? searchPostsSelector : postsSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState();
  const [loading, setLoading] = useState(true);
  const [lastPostId, setLastPostId] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [sortMode, setSortMode] = useState('new');

  useEffect(() => {
    if (type === 'home' || type === 'search') {
      setPosts(postsArray);
    }
  }, [JSON.stringify(postsArray)]);

  useEffect(() => {
    handleLoadMore(true);
  }, []);

  useEffect(() => {
    handleRefresh(searchKeyword);
  }, [sortMode]);

  const handleRefresh = async (keyword) => {
    if (keyword) {
      setPosts([]);
      setLoading(true);
    }
    setIsRefreshing(true);
    setHasMore(true);
    await fetchPosts(null, keyword);
    setIsRefreshing(false);
  };

  useImperativeHandle(ref, () => ({
    handleRefresh,
  }));

  const fetchPosts = async (lastId, keyword) => {
    try {
      const response = await Promisify(dispatch, PostCreators.getPostsRequest, {
        lastId,
        profileId,
        type,
        searchKeyword: keyword || searchKeyword,
        sortMode,
      });
      let updatedPosts = response.posts;

      if (type !== 'home') {
        if (lastId) {
          updatedPosts = _.unionBy(posts, updatedPosts, '_id');
        }
        setPosts(updatedPosts);
      }

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
    navigation.push(navigators.mainNav, { screen: home.chatRoom, params: { post: item, type: 'post' } });
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

  const renderHeader = () => {
    if (type !== 'search') {
      return null;
    }
    return <Styled.SortPanel onSort={setSortMode} sortMode={sortMode} />;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Styled.List
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={type === 'home' && <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
      bounces={!loading}
      keyboardShouldPersistTaps="always"
      {...props}
    />
  );
});

export default PostList;
