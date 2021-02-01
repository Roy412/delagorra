import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, RefreshControl } from 'react-native';
import _ from 'lodash';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';
import { showSimpleError } from '~/utils/alert';

import * as Styled from './styled';

const CommentList = ({ profileId, type, ...props }) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState();
  const [loading, setLoading] = useState(true);
  const [lastCommentId, setLastCommentId] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    handleLoadMore(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchComments();
    setIsRefreshing(false);
  };

  const fetchComments = async (lastId) => {
    try {
      const response = await Promisify(dispatch, ChatCreators.getMessagesRequest, {
        profileId,
        lastMessageId: lastId,
        type,
      });

      if (!lastId) {
        setComments(response.messages);
      } else {
        setComments(_.unionBy(comments, response.messages, '_id'));
      }
      if (response.messages.length < 1) {
        setHasMore(false);
      } else {
        setLastCommentId(response.lastMessageId);
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
    await fetchComments(lastCommentId);
    setLoading(false);
  };

  const handlePressItem = (item) => {};

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: '#000', marginVertical: 10 }} size="large" />;
  };

  const renderItem = ({ item }) => <Styled.CommentItem item={item} onPress={handlePressItem} />;

  const renderEmpty = () =>
    !hasMore && (
      <Styled.Text textAlign="center" mt={20} fontSize={15} fontStyle="medium">
        No Comments
      </Styled.Text>
    );

  return (
    <Styled.List
      data={comments}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
      bounces={!loading}
      ListEmptyComponent={renderEmpty}
      {...props}
    />
  );
};

export default CommentList;
