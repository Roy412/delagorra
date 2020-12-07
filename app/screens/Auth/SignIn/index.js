import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Form, Field } from 'react-final-form';
import Validate from 'validate.js';

import { auth, navigators } from '~/navigation/routeNames';
import * as Client from '~/utils/client';
import { showSimpleError } from '~/utils/alert';
import { Colors } from '~/utils/theme';

import * as Styled from './styled';

const SignIn = ({ navigation, onSignIn }) => {
  const [loading, setLoading] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [countSec, setCountSec] = useState(10);
  const [countDowning, setCountDowning] = useState(false);
  const [sendText, setSendText] = useState('Send');

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

    const errors = Validate(values, constraints);
    return errors;
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
      const response = await Client.post('/user/code-request', { phoneNumber });
      setCodeSending(false);
      startCountdown();
    } catch (e) {
      showSimpleError(e);
      setCodeSending(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await Client.post('/code-request', values);
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

  const renderForm = ({ handleSubmit, errors, submitting, values }) => (
    <Styled.FormContainer>
      <View style={{ flex: 1 }} />
      <Styled.FormContent>
        <Styled.TextPhone family="semibold" align="center">
          Phone Number
          <Styled.Text color={Colors.pink} family="semibold">
            {' '}
            Quick Login
          </Styled.Text>
        </Styled.TextPhone>
        <Field
          name="phoneNumber"
          component={Styled.TextInput}
          placeholder="Your phone"
          variant="phone"
          keyboardType="numeric"
          mask="([000]) [0000] [0000]"
          disabled={countDowning}
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
      </Styled.FormContent>

      <Styled.SignInButton onPress={handleSubmit} text="Log In" disabled={submitting} />

      <View style={{ flex: 1 }} />
    </Styled.FormContainer>
  );

  return (
    <Styled.KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Styled.Container>
        <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleSubmit} />
      </Styled.Container>
      <Styled.Loader loading={loading} />
    </Styled.KeyboardAvoidingView>
  );
};

export default SignIn;
