import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const ProfileSettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleClose = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.LeftButton text="Close" onPress={handleClose} />,
    });
  }, [navigation]);

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    dispatch(AuthCreators.logOutRequest());
  };

  return (
    <Styled.Content>
      <Styled.Container>
        <Styled.Text fontStyle="bold" fontSize={20} textAlign="center" mt={100}>
          {isAuthenticated ? "Welcome! You've logged in successfully!" : 'Home screen'}
        </Styled.Text>
        <Styled.Button mt={50} text="Sign Out" onPress={handleSignOut} />
      </Styled.Container>
    </Styled.Content>
  );
};

export default ProfileSettings;
