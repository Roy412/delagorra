import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';

import { profile, navigators } from '~/navigation/routeNames';
import { user as userSelector } from '~/store/selectors/session';
import { bookmarkIcon, messageIcon, activityIcon, historyIcon } from '~/resources';

import * as Styled from './styled';

const ProfileMain = ({ navigation }) => {
  const [isAvatarShow, setIsAvatarShow] = useState();
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
    navigation.navigate(navigators.mainNav, { screen: profile.personalPage, params: { profileId: user._id } });
  };

  const handleAvatarPress = () => {
    if (user.avatar) {
      setIsAvatarShow(true);
    }
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const handleSaveProfileImg = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    RNFetchBlob.config({ fileCache: true, appendExt: 'png' })
      .fetch('GET', user.avatar)
      .then((res) => {
        CameraRoll.save(res.data)
          .then(() => {
            Toast.show({ text1: 'Picture saved', position: 'bottom' });
          })
          .catch((err) => {
            Alert.alert(
              'Save profile image',
              'Failed to save Image: ' + err.message,
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
          })
          .finally(() => setIsAvatarShow(false));
      })
      .catch((error) => {
        setIsAvatarShow(false);
        Alert.alert(
          'Save profile image',
          'Failed to save Image: ' + error.message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      });
  };

  return (
    <Styled.Content>
      <Styled.Box bg="white" pb={10} pt={16}>
        <Styled.Box flexDirection="row" alignItems="center" px={16}>
          <Styled.AvatarCircle url={user.avatar} size={60} onPress={handleAvatarPress} />

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

      <Styled.ImageViewer
        onSave={handleSaveProfileImg}
        images={[{ uri: user.avatar }]}
        imageIndex={0}
        visible={isAvatarShow}
        onRequestClose={() => setIsAvatarShow(false)}
      />
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

const BookmarkItem = ({ label, icon, width, aspectRatio }) => (
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
