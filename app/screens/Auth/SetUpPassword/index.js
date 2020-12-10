import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';
import { showSimpleError } from '~/utils/alert';

import * as Styled from './styled';

const SetUpPassword = ({ navigation, onSignIn }) => {
  const [loading, setLoading] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [countSec, setCountSec] = useState(10);
  const [countDowning, setCountDowning] = useState(false);
  const [sendText, setSendText] = useState('Send');

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
      // const response = await Client.post('/user/code-request', { phoneNumber });
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
      // const response = await Client.post('/code-request', values);
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
    <Styled.Box px={30} flex={1}>
      <View style={{ flex: 0.2 }} />
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

      <Styled.Button mt={50} onPress={handleSubmit} text="Confirm" disabled={submitting} />
    </Styled.Box>
  );

  return (
    <Styled.Box flex={1}>
      <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleSubmit} />
      <Styled.Loader loading={loading} />
    </Styled.Box>
  );
};

export default SetUpPassword;
