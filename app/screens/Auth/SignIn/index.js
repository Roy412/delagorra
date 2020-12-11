import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';

import { AuthCreators } from '~/store/actions/auth';
import { showSimpleError } from '~/utils/alert';
import { Colors } from '~/utils/theme';
import { Promisify } from '~/utils/promisify';
import { main, auth } from '~/navigation/routeNames';

import TermsModal from './TermsModal';
import * as Styled from './styled';

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userResponse, setUserResponse] = useState();
  const [codeSending, setCodeSending] = useState(false);
  const [countSec, setCountSec] = useState(10);
  const [countDowning, setCountDowning] = useState(false);
  const [sendText, setSendText] = useState('Send');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const dispatch = useDispatch();

  const getInitialValues = () => ({
    phoneNumber: '',
    code: '',
  });

  const validate = (values) => {
    const constraints = {
      phoneNumber: {
        presence: { message: '^Required', allowEmpty: false },
        length: { is: 11, message: '^Wrong number' },
      },
      code: {
        presence: { message: '^Required', allowEmpty: false },
        length: { is: 4, message: '^Too short' },
      },
    };

    return Validate(values, constraints);
  };

  const startCountdown = () => {
    setCountDowning(true);
    const interval = setInterval(() => {
      setCountSec((prevCountSec) => {
        if (prevCountSec === 1) {
          setCountDowning(false);
          clearInterval(interval);
          return;
        }
        return prevCountSec - 1;
      });
    }, 1000);
  };

  const handleCodeSend = async ({ phoneNumber }) => {
    try {
      setCodeSending(true);
      await Promisify(dispatch, AuthCreators.requestCodeRequest, { phoneNumber });
      setCodeSending(false);
      startCountdown();
    } catch (e) {
      showSimpleError(e);
      setCodeSending(false);
    }
  };

  const handleSignIn = async (values) => {
    try {
      setLoading(true);
      const response = await Promisify(dispatch, AuthCreators.codeVerifyRequest, values);
      setUserResponse(response);
      if (!response.user.password) {
        setShowTermsModal(true);
      } else {
        dispatch(AuthCreators.signInSuccess(response));
        navigation.navigate(main.home);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showSimpleError(e);
    }
  };

  useEffect(() => {
    if (countDowning) {
      setSendText(`${countSec} sec`);
    } else {
      setSendText('Send');
    }
  }, [countDowning, countSec]);

  useEffect(() => {
    if (!countDowning) {
      setCountSec(5);
    }
  }, [countDowning]);

  const handlePrivacyAgree = () => {
    dispatch(AuthCreators.signInSuccess(userResponse));
    navigation.navigate(auth.setUpPassword);
  };

  const renderForm = ({ handleSubmit, errors, submitting, values }) => (
    <Styled.Box px={15} flex={1}>
      <Styled.Box flex={0.3} />
      <Styled.Box>
        <Styled.Text fontStyle="semibold" textAlign="center" mb={5}>
          Phone Number
          <Styled.Text color={Colors.pink} fontStyle="semibold">
            {' '}
            Quick Login
          </Styled.Text>
        </Styled.Text>
        <Field
          name="phoneNumber"
          component={Styled.TextInput}
          placeholder="Your phone"
          variant="phone"
          keyboardType="numeric"
          mask="([000]) [0000] [0000]"
          disabled={codeSending || countDowning}
        />

        <Field
          name="code"
          component={Styled.TextInput}
          placeholder="Verification code"
          variant="phoneCode"
          onSendPress={() => handleCodeSend(values)}
          keyboardType="numeric"
          btnSendText={errors.phoneNumber ? '' : sendText}
          mask="[0000]"
          codeSending={codeSending}
        />
      </Styled.Box>

      <Styled.Button mt={15} onPress={handleSubmit} text="Log In" disabled={submitting} />
    </Styled.Box>
  );

  return (
    <Styled.KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Styled.Container>
        <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleSignIn} />
      </Styled.Container>
      <Styled.Loader loading={loading} />
      <TermsModal
        onBackdropPress={() => setShowTermsModal(false)}
        isVisible={showTermsModal}
        handleAgree={handlePrivacyAgree}
      />
    </Styled.KeyboardAvoidingView>
  );
};

export default SignIn;
