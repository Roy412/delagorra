import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, profile } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { user as userSelector } from '~/store/selectors/session';

import * as Styled from './styled';

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
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
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

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    dispatch(AuthCreators.logOutRequest());
  };

  const handleSignIn = () => {
    navigation.navigate(navigators.auth);
  };

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

        <Styled.Box flexDirection="row" alignItems="center" justifyContent="center" mt={20} px={30}>
          <LikeItem label="likes" value={user.likes} />
          <LikeItem label="following" value={user.following} />
          <LikeItem label="followers" value={user.followers} />
        </Styled.Box>
      </Styled.Box>
    </Styled.Content>
  );
};

export default Profile;
