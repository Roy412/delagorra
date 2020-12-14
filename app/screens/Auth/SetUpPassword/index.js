import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import { Promisify } from '~/utils/promisify';
import { showSimpleError } from '~/utils/alert';
import { ProfileCreators } from '~/store/actions/profile';
import { main, navigators, auth } from '~/navigation/routeNames';

import * as Styled from './styled';

const SetUpPassword = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isForgot } = route.params;

  const getInitialValues = () => ({
    password: '',
    confirmPassword: '',
  });

  const validate = (values) => {
    const constraints = {
      password: {
        presence: { message: '^Required', allowEmpty: false },
        length: { minimum: 8, message: '^Too short' },
      },
      confirmPassword: {
        presence: { message: '^Required', allowEmpty: false },
        length: { minimum: 8, message: '^Too short' },
        equality: {
          attribute: 'password',
          message: '^Passwords do not match',
        },
      },
    };

    return Validate(values, constraints);
  };

  const handleHideToast = () => {
    if (isForgot) {
      navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    } else {
      navigation.navigate(navigators.main, { screen: main.home });
    }
  };

  const handleConfirm = async (values) => {
    try {
      setLoading(true);
      await Promisify(dispatch, ProfileCreators.profileUpdateRequest, values);
      navigation.navigate(main.home);
      setLoading(false);
      Toast.show({
        text1: 'Successful Verification',
        position: 'bottom',
        onHide: handleHideToast,
        visibilityTime: 1000,
      });
    } catch (e) {
      setLoading(false);
      showSimpleError(e);
    }
  };

  const renderForm = ({ handleSubmit, submitting }) => (
    <Styled.Box px={30} flex={1}>
      <Styled.Box flex={0.2} />
      <Styled.Box>
        <Field
          name="password"
          component={Styled.TextInput}
          placeholder="Please enter new password"
          secureTextEntry
          maxLength={20}
        />

        <Field
          name="confirmPassword"
          component={Styled.TextInput}
          placeholder="Please enter new password again"
          secureTextEntry
          maxLength={20}
        />

        <Styled.Text color="veryDarkGray" fontSize={14} mt={10} opacity={0.4} textAlign="center">
          (8-20 english letters or numbers or symbols)
        </Styled.Text>
      </Styled.Box>

      <Styled.Button mt={50} onPress={() => handleConfirm()} text="Confirm" disabled={submitting} />
    </Styled.Box>
  );

  return (
    <Styled.Box flex={1}>
      <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleConfirm} />
      <Styled.Loader loading={loading} />
    </Styled.Box>
  );
};

export default SetUpPassword;
