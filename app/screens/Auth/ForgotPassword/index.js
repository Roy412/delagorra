import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';

import { AuthCreators } from '~/store/actions/auth';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';
import { auth, navigators } from '~/navigation/routeNames';

import * as Styled from './styled';

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState('phone');
  const [codeSending, setCodeSending] = useState(false);
  const [countSec, setCountSec] = useState(10);
  const [countDowning, setCountDowning] = useState(false);
  const [sendText, setSendText] = useState('Send');
  const dispatch = useDispatch();

  const getInitialValues = () => ({
    phoneNumber: '',
    code: '',
  });

  const validate = (values) => {
    const constraints = {
      phone: {
        phoneNumber: {
          presence: { message: '^Required', allowEmpty: false },
          length: { is: 11, message: '^Wrong number' },
        },
      },
      code: {
        code: {
          presence: { message: '^Required', allowEmpty: false },
          length: { is: 4, message: '^Too short' },
        },
      },
    };

    return Validate(values, constraints[forgotMode]);
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

  useEffect(() => {
    if (countDowning) {
      setSendText(`${countSec} sec`);
    } else {
      setSendText('Resend');
    }
  }, [countDowning, countSec]);

  useEffect(() => {
    if (!countDowning) {
      setCountSec(5);
    }
  }, [countDowning]);

  const handleNext = async (values) => {
    try {
      setLoading(true);
      if (forgotMode === 'phone') {
        await Promisify(dispatch, AuthCreators.requestCodeRequest, { phoneNumber: values.phoneNumber });
        setLoading(false);
        setForgotMode('code');
        startCountdown();
      } else {
        await Promisify(dispatch, AuthCreators.codeVerifyRequest, {
          phoneNumber: values.phoneNumber,
          code: values.code,
        });
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: navigators.auth, params: { screen: auth.setUpPassword } }],
        });
      }
    } catch (e) {
      setLoading(false);
      showSimpleError(e);
    }
  };

  const renderForm = ({ handleSubmit, submitting, values }) => (
    <Styled.Box px={15} flex={1}>
      <Styled.Box flex={0.1} />
      <Styled.Box>
        {forgotMode === 'phone' ? (
          <Field
            name="phoneNumber"
            component={Styled.TextInput}
            placeholder="Please enter phone number"
            variant="phone"
            keyboardType="numeric"
            mask="([000]) [0000] [0000]"
          />
        ) : (
          <Field
            name="code"
            component={Styled.TextInput}
            placeholder="Verification code"
            variant="phoneCode"
            onSendPress={() => handleCodeSend(values)}
            keyboardType="numeric"
            btnSendText={sendText}
            codeSending={codeSending}
            mask="[0000]"
          />
        )}
      </Styled.Box>

      <Styled.Button mt={15} onPress={handleSubmit} text="Next" disabled={submitting} />
    </Styled.Box>
  );

  return (
    <Styled.KeyboardAwareScrollView>
      <Styled.Container>
        <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleNext} />
      </Styled.Container>
      <Styled.Loader loading={loading} />
    </Styled.KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
