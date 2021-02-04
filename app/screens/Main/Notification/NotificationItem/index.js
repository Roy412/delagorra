import React from 'react';
import { parseISO } from 'date-fns';

import { timeSince } from '~/utils/utils';

import * as Styled from './styled';

const NotificationItem = ({ item, onPress }) => {
  const handleAvatarPress = () => {
    // navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: item.creator._id } });
  };

  const strSince = timeSince(parseISO(item.createdAt));

  const getTitle = () => {
    let prefix = '';
    if (item.userCount > 1) {
      prefix = ` and ${item.userCount} others`;
    }
    let suffix = '';
    if (item.type === 'like_post') {
      suffix = 'liked your post.';
    } else if (item.type === 'like_comment') {
      suffix = 'liked your comment.';
    } else if (item.type === 'reply_post') {
      suffix = 'replied to your post:';
    } else if (item.type === 'reply_comment') {
      suffix = 'replied to your comment:';
    }
    return `${prefix} ${suffix}`;
  };

  const getMiddle = () => {
    if (item.type === 'like_post' || item.type === 'like_comment') {
      return null;
    }
    return (
      <Styled.Text mt={6} color="veryDarkGray" fontSize={17} fontStyle="bold">
        {item.comment.text}
      </Styled.Text>
    );
  };

  const getFooter = () => {
    if (item.type === 'like_post' || item.type === 'like_comment') {
      return `“${item.post.title}”`;
    }
    return item.post.title;
  };

  return (
    <Styled.Container onPress={() => onPress(item)} isRead={item.isRead}>
      {!item.isRead ? (
        <Styled.Box mr={6} width={5} height={5} borderRadius={3} isRead={item.isRead} bg="pink" />
      ) : (
        <Styled.Box width={11} />
      )}
      <Styled.AvatarCircle url={item.otherUser.avatar} size={35} onPress={handleAvatarPress} />
      <Styled.Box flex={1} ml={15}>
        <Styled.Text color="veryDarkGray" fontSize={15} fontStyle="bold">
          {item.user.displayName}
          <Styled.Text color="veryDarkGray" fontSize={15}>
            {getTitle()}
          </Styled.Text>
        </Styled.Text>

        {getMiddle()}

        <Styled.Box flexDirection="row" alignItems="center" mt={10}>
          {(item.type === 'reply_post' || item.type === 'reply_comment') && <Styled.Box width={1.5} bg="#D7D7D7" />}
          <Styled.Text color="#6E6E6E" fontSize={14} numberOfLines={1}>
            {getFooter()}
          </Styled.Text>
        </Styled.Box>
      </Styled.Box>

      <Styled.Box alignItems="flex-end" alignSelf="flex-start" mt={4} width={35}>
        {strSince && (
          <Styled.Text fontSize={11} color="rgba(19,19,19,0.5)">
            {strSince}
          </Styled.Text>
        )}
      </Styled.Box>
    </Styled.Container>
  );
};

export default NotificationItem;
