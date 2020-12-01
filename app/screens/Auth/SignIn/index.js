import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Form, Field } from 'react-final-form';
import Validate from 'validate.js';

import { auth, navigators } from '~/navigation/routeNames';
import Client from '~/utils/client';
import { showSimpleError } from '~/utils/alert';

import * as Styled from './styled';

const SignIn = ({ navigation, onSignIn }) => {
  const [loading, setLoading] = useState(false);

  const getInitialValues = () => ({
    phoneNumber: '',
    code: '',
  });

  const validate = (values) => {
    const constraints = {
      phoneNumber: {
        presence: {
          message: 'is required',
          allowEmpty: false,
        },
      },
      code: {
        presence: true,
        length: { minimum: 4 },
      },
    };

    return Validate(values, constraints);
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

  const renderForm = (params) => (
    <Styled.FormContainer>
      <Styled.FormContent>
        <Styled.Text>

        </Styled.Text>
        <Field
          name="phoneNumber"
          component={Styled.TextInput}
          keyboardType="default"
          placeholder="Username"
          autoCapitalize="none"
        />

        <Field name="code" component={Styled.TextInput} placeholder="Enter your password" autoCapitalize="none" />
      </Styled.FormContent>

      <Styled.SignInButton onPress={params.handleSubmit} />
    </Styled.FormContainer>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Styled.Container>
        <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleSubmit} />
      </Styled.Container>
      <Styled.Loader loading={loading} />
    </KeyboardAvoidingView>
  );
};

export default SignIn;
