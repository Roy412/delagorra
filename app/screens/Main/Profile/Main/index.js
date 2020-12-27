import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, profile } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { user as userSelector } from '~/store/selectors/session';

import * as Styled from './styled';

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

  return (
    <Styled.Content>
      <Styled.Container>
        <Styled.Text fontStyle="bold" fontSize={20} textAlign="center" mt={100}>
          {isAuthenticated ? "Welcome! You've logged in successfully!" : 'Home screen'}
        </Styled.Text>
        {isAuthenticated ? (
          <Styled.Button mt={50} text="Sign Out" onPress={handleSignOut} />
        ) : (
          <Styled.Button mt={50} text="Sign In" onPress={handleSignIn} />
        )}
      </Styled.Container>
    </Styled.Content>
  );
};

export default Profile;
