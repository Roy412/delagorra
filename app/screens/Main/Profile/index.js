import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, main, auth } from '~/navigation/routeNames';

import * as Styled from './styled';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.CloseButton onPress={handleClose} />,
    });
  }, [navigation]);

  const handleSignOut = () => {
    dispatch(AuthCreators.logOutRequest());
    navigation.reset({
      index: 1,
      routes: [
        { name: navigators.main, params: { screen: main.profile } },
        { name: navigators.auth, params: { screen: auth.signIn } },
      ],
    });
  };

  return (
    <Styled.Content>
      <Styled.Container>
        <Styled.Text fontStyle="bold" fontSize={20} textAlign="center" mt={100}>
          Welcome! You've logged in successfully!
        </Styled.Text>
        <Styled.Button mt={50} text="Sign Out" onPress={handleSignOut} />
      </Styled.Container>
    </Styled.Content>
  );
};

export default Profile;
