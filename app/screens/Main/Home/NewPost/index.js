import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, home } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';

import * as Styled from './styled';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';

const NewPost = ({ navigation }) => {
  const dispatch = useDispatch();
  const [postEnable, setPostEnable] = useState();
  const [loading, setLoading] = useState();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const getInitialValues = () => ({
    title: '',
    content: '',
  });

  const validate = (values) => {
    const constraints = {
      title: {
        presence: { message: '^Required', allowEmpty: false },
        length: { minimum: 3, maximum: 50, tooShort: '^Too short' },
      },
      content: {
        length: { maximum: 40 },
      },
    };

    return Validate(values, constraints);
  };

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

  const renderForm = ({ handleSubmit, submitting }) => (
    <Styled.Box px={18} pt={20} flex={1}>
      <Styled.Box>
        <Field
          name="title"
          component={Styled.TitleInput}
          placeholder="Enter a title (3 to 50 characters)"
          maxLength={150}
          multiline
        />

        <Field
          name="content"
          component={Styled.ContentInput}
          placeholder="Write out your post"
          maxLength={40}
          multiline
        />
      </Styled.Box>
    </Styled.Box>
  );

  return (
    <Styled.Box flex={1}>
      <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={() => ''} />
      <Styled.Loader loading={loading} />
    </Styled.Box>
  );
};

export default NewPost;
