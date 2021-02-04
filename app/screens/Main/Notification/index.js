import React, { useState, useEffect } from 'react';
import { RefreshControl, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Promisify } from '~/utils/promisify';
import { PostCreators } from '~/store/actions/post';
import { notifications as notificationsSelector } from '~/store/selectors/notification';
import { showSimpleError } from '~/utils/alert';
import { navigators, home } from '~/navigation/routeNames';

import * as Styled from './styled';

const NotificationList = ({ profileId, type, ...props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const notifications = useSelector(notificationsSelector);

  const [isRefreshing, setIsRefreshing] = useState();
  const [loading, setLoading] = useState(true);
  const [lastPostId, setLastPostId] = useState();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleLoadMore(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  };

  const fetchNotifications = async (lastId) => {
    try {
      const response = await Promisify(dispatch, PostCreators.getNotificationsRequest, { lastId });
      if (response.notifications.length < 1) {
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
    await fetchNotifications(lastPostId);
    setLoading(false);
  };

  const handlePressItem = (item) => {
    // navigation.push(navigators.mainNav, { screen: home.chatRoom, params: { post: item, type: 'post' } });
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => <Styled.NotificationItem item={item} onPress={handlePressItem} />;

  const renderEmpty = () =>
    !hasMore && (
      <Styled.Text textAlign="center" mt={20} fontSize={15} fontStyle="medium">
        No Posts
      </Styled.Text>
    );

  return (
    <Styled.List
      data={notifications}
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

export default NotificationList;
