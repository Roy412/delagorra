import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { profile } from '~/navigation/routeNames';
import { user as userSelector } from '~/store/selectors/session';
import { bookmarkIcon, messageIcon, activityIcon, historyIcon } from '~/resources';

import * as Styled from './styled';

const ProfileMain = ({ navigation }) => {
  const user = useSelector(userSelector);

  const handleSettings = () => {
    navigation.navigate(profile.settings);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.GearButton onPress={handleSettings} />,
      title: user.displayName,
    });
  }, [navigation, user]);

  const handlePersonalPage = () => {
    // navigation.navigate(navigators.auth);
  };

  return (
    <Styled.Content>
      <Styled.Box bg="white" pb={10} pt={16}>
        <Styled.Box flexDirection="row" alignItems="center" px={16}>
          <Styled.AvatarPicker url={user.profileImage} size={60} />

          <Styled.Text color="veryDarkGray" ml={10} fontStyle="semibold" fontSize={17} textAlign="center">
            {user.displayName}
          </Styled.Text>

          <Styled.LevelText>
            <Styled.Text fontSize={13} fontStyle="semibold" color="white">
              LV {user.level}
            </Styled.Text>
          </Styled.LevelText>

          <Styled.Box flex={1} />

          <Styled.BtnPersnal onPress={handlePersonalPage}>
            <Styled.Text color="pink">Personal page</Styled.Text>
            <Styled.RightArrow />
          </Styled.BtnPersnal>
        </Styled.Box>

        <Styled.Box flexDirection="row" alignItems="center" justifyContent="center" mt={20} px={40}>
          <LikeItem label="likes" value={user.likes} />
          <LikeItem label="following" value={user.following} />
          <LikeItem label="followers" value={user.followers} />
        </Styled.Box>
      </Styled.Box>

      <Styled.BookmarkContainer>
        <BookmarkItem label="Bookmarks" icon={bookmarkIcon} width={24} aspectRatio={1} />
        <BookmarkItem label="Messages" icon={messageIcon} width={24} aspectRatio={80 / 56} />
        <BookmarkItem label="My activites" icon={activityIcon} width={23} aspectRatio={1} />
        <BookmarkItem label="History" icon={historyIcon} width={24} aspectRatio={1} />
      </Styled.BookmarkContainer>
    </Styled.Content>
  );
};

const LikeItem = ({ label, value }) => (
  <Styled.Box flex={1}>
    <Styled.Text fontSize={16} textAlign="center" color="veryDarkGray">
      {value}
    </Styled.Text>
    <Styled.Text mt={2} fontSize={14} textAlign="center" color="rgba(19,19,19,0.5)">
      {label}
    </Styled.Text>
  </Styled.Box>
);

const BookmarkItem = ({ label, icon, badge, width, aspectRatio }) => (
  <Styled.BookmarkItem>
    <Styled.BookmarkIconWrapper>
      <Styled.BookmarkIcon icon={icon} width={width} aspectRatio={aspectRatio} />
    </Styled.BookmarkIconWrapper>
    <Styled.Text mt={7} fontSize={11} textAlign="center" color="rgba(19,19,19,0.5)">
      {label}
    </Styled.Text>
  </Styled.BookmarkItem>
);

export default ProfileMain;
