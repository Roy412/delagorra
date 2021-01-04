import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, home } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const NewPost = ({ navigation }) => {
  const dispatch = useDispatch();
  const [postEnable, setPostEnable] = useState();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleClose = () => {
    navigation.goBack();
  };

  const handlePost = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.CloseButton onPress={handleClose} />,
      headerRight: <Styled.RightButton disabled={!postEnable} text="Post" onPress={handlePost} />,
    });
  }, [navigation, postEnable]);

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    dispatch(AuthCreators.logOutRequest());
  };

  const handleSignIn = () => {
    navigation.navigate(navigators.auth);
  };

  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  return (
    <Styled.Content>
      <Styled.Box flexDirection="row" alignItems="center">
        <Styled.Button text="+ Create" onPress={handleCreatePost} />
      </Styled.Box>
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

export default NewPost;
