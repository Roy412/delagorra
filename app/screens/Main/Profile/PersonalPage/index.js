import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import { user as userSelector } from '~/store/selectors/session';
import { home, profile as profileNav } from '~/navigation/routeNames';
import { Promisify } from '~/utils/promisify';
import { ProfileCreators } from '~/store/actions/profile';
import { showSimpleError } from '~/utils/alert';
import PhotoService from '~/services/photo';
import { sharing as sharingSelector } from '~/store/selectors/post';

import * as Styled from './styled';
import Tabs from '../MyActivities';

const ProfileInfoItem = ({ label, value }) => (
  <Styled.Box alignItems="center" flex={1}>
    <Styled.Text color="veryDarkGray" fontSize={15}>
      {value === undefined ? ' ' : value}
    </Styled.Text>
    <Styled.Text color="rgba(19,19,19,0.5)" fontSize={15}>
      {label}
    </Styled.Text>
  </Styled.Box>
);

const PersonalPage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { profileId } = route.params;
  const [profile, setProfile] = useState();
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState();
  const postSharing = useSelector(sharingSelector);

  const isMine = profileId === user._id;

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (isMine) {
      setProfile({ ...profile, ...user });
    }
  }, [JSON.stringify(user)]);

  const fetchProfile = async () => {
    try {
      setProfile(await Promisify(dispatch, ProfileCreators.getProfileRequest, { profileId, isMine }));
    } catch (e) {}
  };

  const handleChat = () => {
    navigation.push(home.chatRoom, { otherUserId: profileId, type: 'chat' });
  };

  const handleEditProfile = () => {
    if (isMine) {
      return navigation.navigate(profileNav.editProfile);
    }
    setProfile({
      ...profile,
      follow: !profile.follow,
      following: !profile.follow ? profile.following + 1 : profile.following - 1,
    });
    handleFollowDebounced(!profile.follow);
  };

  const handleFollowDebounced = useCallback(
    _.debounce(async (followValue) => {
      try {
        await Promisify(dispatch, ProfileCreators.profileFollowRequest, { otherId: profileId, follow: followValue });
      } catch (e) {
        showSimpleError(e);
      } finally {
      }
    }, 100),
    [],
  );

  const handleBack = () => {
    navigation.goBack(null);
  };

  const handleBackgroundPress = (option) => {
    const func = option.value === 'take' ? ImagePicker.openCamera : ImagePicker.openPicker;
    func({
      width: 1000,
      height: 700,
      cropping: true,
    })
      .then((value) => {
        handleBackgroundSave(PhotoService.file2Attachment(value, 'backgroundImg'));
      })
      .catch(() => {});
  };

  const handleBackgroundSave = async (file) => {
    try {
      setLoading(true);
      await Promisify(dispatch, ProfileCreators.profileUpdateRequest, { files: [file] });
      setLoading(false);
      Toast.show({ text1: 'Successfully updated the profile background!', position: 'bottom' });
    } catch (e) {
      showSimpleError(e);
      setLoading(false);
    }
  };

  const renderContent = () => (
    <>
      <Styled.Box>
        <Styled.BackgroundImage source={profile.background && { uri: profile.background }} />
        <Styled.SimpleHeader barStyle="light-content" bg={'transparent'} />
        <Styled.Header flexDirection="row" alignItems="center" justifyContent="space-between" mt={10} mb={50}>
          <Styled.BackButton onPress={handleBack} />
          {!isMine && <Styled.RightButton onPress={handleChat} />}

          {isMine && (
            <Styled.ActionPicker
              options={[
                {
                  value: 'take',
                  label: 'Take Photo...',
                },
                {
                  value: 'choose',
                  label: 'Choose from Library...',
                },
              ]}
              onPressItem={handleBackgroundPress}>
              <Styled.PictureImage />
            </Styled.ActionPicker>
          )}
        </Styled.Header>
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center" pl={80} pt={8} pr={10}>
        <Styled.AvatarWrapper>
          <Styled.AvatarCircle url={profile.avatar} size={74} disabled />
        </Styled.AvatarWrapper>
        <ProfileInfoItem label="likes" value={profile.likes} />
        <ProfileInfoItem label="following" value={profile.following} />
        <ProfileInfoItem label="followers" value={profile.followers} />
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center" ml={20} mr={18} mt={20}>
        <Styled.Text color="veryDarkGray" fontSize={18}>
          {profile.displayName}
        </Styled.Text>
        <Styled.LevelBox level={profile.level} />
        <Styled.Box flex={1} />
        <Styled.BtnEditProfile onPress={handleEditProfile} isMine={isMine} follow={profile.follow} />
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center" mt={16} mx={18}>
        <Styled.Text color="pink" fontStyle="semiBold" fontSize={14}>
          LV {profile.level}
        </Styled.Text>
        <Styled.Box flex={1} bg="rgba(19,19,19,0.1)" mx={10}>
          <Styled.PointBox point={profile.point} maxPoint={profile.maxPoint} />
        </Styled.Box>
        <Styled.Text color="pink" fontStyle="semiBold">
          {profile.point}/{profile.maxPoint}
        </Styled.Text>
      </Styled.Box>

      {!!profile.bio && (
        <Styled.Text m={16} color="rgba(19,19,19,0.8)">
          {profile.bio}
        </Styled.Text>
      )}

      <Styled.Box bg="background" height={3} mt={16} />
    </>
  );

  return (
    <Styled.Container>
      {profile ? renderContent() : null}
      <Tabs route={{ params: { profileId } }} />
      {!profile && <Styled.Loader loading grayBackground />}
      <Styled.Loader loading={loading || postSharing} />
    </Styled.Container>
  );
};

export default PersonalPage;
