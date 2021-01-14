import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user as userSelector } from '~/store/selectors/session';
import { home, navigators } from '~/navigation/routeNames';
import { Promisify } from '~/utils/promisify';
import { ProfileCreators } from '~/store/actions/profile';

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
  const { profileId } = route.params;
  const [profile, setProfile] = useState();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const isMine = profileId === user._id;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setProfile(await Promisify(dispatch, ProfileCreators.getProfileRequest, profileId));
    } catch (e) {}
  };

  const handleChat = () => {
    navigation.navigate(home.chatRoom, { otherId: profileId });
  };

  const handleEditProfile = () => {};

  const handleBack = () => {
    navigation.goBack(null);
  };

  if (!profile) {
    return <Styled.Loader loading />;
  }

  return (
    <Styled.Container>
      <Styled.BackgroundImage>
        <Styled.BackButton onPress={handleBack} />
        {!isMine && <Styled.RightButton onPress={handleChat} />}
      </Styled.BackgroundImage>
      <Styled.AvatarWrapper>
        {/*<Styled.AvatarCircle url={profile.profileImage} />*/}
      </Styled.AvatarWrapper>

      {/*<Styled.Box>*/}
      {/*  <ProfileInfoItem label="likes" value={profile.likes} />*/}
      {/*  <ProfileInfoItem label="following" value={profile.following} />*/}
      {/*  <ProfileInfoItem label="followers" value={profile.followers} />*/}
      {/*</Styled.Box>*/}

      {/*<Styled.Box flexDirection="row" alignItems="center">*/}
      {/*  <Styled.Text>{profile.displayName}</Styled.Text>*/}
      {/*  <Styled.Button text={`LV ${profile.level}`} />*/}
      {/*  <Styled.Button text="Edit profile" onPress={handleEditProfile} />*/}
      {/*</Styled.Box>*/}

      {/*<Styled.Box flexDirection="row" alignItems="center">*/}
      {/*  <Styled.Text>LV {profile.level}</Styled.Text>*/}

      {/*  <Styled.Box>*/}
      {/*    <Styled.PointBox point={profile.point} maxPoint={profile.maxPoint} />*/}
      {/*  </Styled.Box>*/}

      {/*  <Styled.Text>*/}
      {/*    {profile.point}/{profile.maxPoint}*/}
      {/*  </Styled.Text>*/}
      {/*</Styled.Box>*/}

      {/*{!!profile.bio && <Styled.Text>{profile.bio}</Styled.Text>}*/}
    </Styled.Container>
  );
};

export default PersonalPage;
