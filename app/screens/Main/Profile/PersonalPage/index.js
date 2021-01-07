import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { user as userSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const ProfileInfoItem = ({ label, value }) => (
  <Styled.Box alignItems="center" flex={1}>
    <Styled.Text ml={6} color="rgba(19,19,19,0.25)" fontStyle="medium">
      {label}
    </Styled.Text>
    <Styled.Text ml={6} color="rgba(19,19,19,0.25)" fontStyle="medium">
      {value}
    </Styled.Text>
  </Styled.Box>
);

const PersonalPage = ({ route, navigation }) => {
  const { post } = route.params || {};
  const [profile, setProfile] = useState();
  const user = useSelector(userSelector);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: post.creator.displayName,
    });
  }, [navigation]);

  const handleEditProfile = () => {};

  if (!profile) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.BackgroundImage />
      <Styled.AvatarWrapper>
        <Styled.AvatarCircle url={post.creator.profileImage} />
      </Styled.AvatarWrapper>

      <Styled.Box>
        <ProfileInfoItem label="likes" value={profile.likes} />
        <ProfileInfoItem label="following" value={profile.following} />
        <ProfileInfoItem label="followers" value={profile.followers} />
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center">
        <Styled.Text>{profile.displayName}</Styled.Text>
        <Styled.Button text={`LV ${profile.level}`} />
        <Styled.Button text="Edit profile" onPress={handleEditProfile} />
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center">
        <Styled.Text>LV {profile.level}</Styled.Text>

        <Styled.Box>
          <Styled.PointBox point={profile.point} maxPoint={profile.maxPoint} />
        </Styled.Box>

        <Styled.Text>
          {profile.point}/{profile.maxPoint}
        </Styled.Text>
      </Styled.Box>

      {!!profile.bio && <Styled.Text>{profile.bio}</Styled.Text>}
    </Styled.Container>
  );
};

export default PersonalPage;
