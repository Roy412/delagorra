import React, { useLayoutEffect, useState } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch } from 'react-redux';

import { Promisify } from '~/utils/promisify';
import { ChatCreators } from '~/store/actions/chat';

import * as Styled from './styled';
import PostItem from '../Main/PostItem';

const PostDetail = ({ route, navigation }) => {
  const { post } = route.params || {};
  const [comment, setComment] = useState();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: post.creator.displayName,
    });
  }, [navigation]);

  const handleSend = async () => {
    try {
      await Promisify(dispatch, ChatCreators.chatSendRequest, { text: comment, postId: post._id });
    } catch (e) {}
  };

  const renderHeader = () => <PostItem item={post} />;

  return (
    <Styled.Container>
      <Styled.Box alignItems="center" flexDirection="row" bg="white" p={16}>
        <Styled.TextInput onChangeText={setComment} value={comment} placeholder="Add a comment" />
        <Styled.SendButton onPress={handleSend} ml={16} />
      </Styled.Box>
      <KeyboardSpacer topSpacing={-getBottomSpace()} />
    </Styled.Container>
  );
};

export default PostDetail;
