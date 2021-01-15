import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user as userSelector } from '~/store/selectors/session';
import { home, navigators } from '~/navigation/routeNames';
import { Promisify } from '~/utils/promisify';
import { ProfileCreators } from '~/store/actions/profile';

import * as Styled from './styled';

const ProfileInfoItem = ({ label, value }) => (
  <Styled.Box alignItems="center" flex={1}>
    <Styled.Text color="veryDarkGray" fontSize={15}>
      {value}
    </Styled.Text>
    <Styled.Text color="rgba(19,19,19,0.5)" fontSize={15}>
      {label}
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
    navigation.navigate(home.chatRoom, { otherUserId: profileId });
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
      <Styled.Box>
        <Styled.BackgroundImage />
        <Styled.SimpleHeader barStyle="light-content" bg={'transparent'} />
        <Styled.Header flexDirection="row" alignItems="center" justifyContent="space-between" mt={10} mb={50}>
          <Styled.BackButton onPress={handleBack} />
          {!isMine && <Styled.RightButton onPress={handleChat} />}
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
