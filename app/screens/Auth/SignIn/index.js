import React, { useRef } from 'react'
import PT from 'prop-types'
import { Form, Field } from 'react-final-form'

import { ReactNavigationPropTypes } from 'constants/propTypes'
import { auth, navigators } from 'constants/routeNames'
import { Promisify } from 'utils/promisify'
import ValidationService from 'services/validation'
import { showSimpleError } from 'utils/alert'

import {
  Wrapper as Container,
  FormInner,
  FormContainer,
  ForgotButton,
  SignInButton,
  TextInput,
  Scrollable,
  AppIcon,
  ProfileIcon,
  LockIcon,
  SignUpButton,
  TextNew,
  SignUpWrapper,
  Loader,
  CloseButton,
} from './styles'

const SignIn = ({ navigation, onSignIn }) => {
  const loader = useRef()

  const getInitialValues = () => ({
    username: '',
    password: '',
  })

  const validate = (values) => {
    const constraints = {
      username: {
        presence: {
          message: 'is required',
          allowEmpty: false,
        },
      },
      password: {
        presence: true,
        length: { minimum: 8 },
      },
    }

    return ValidationService.validate(constraints, values)
  }

  const handleForgotPress = () => {
    navigation.navigate(auth.forgotPassword)
  }

  const handleSignUpPress = () => {
    navigation.navigate(navigators.onboarding, { screen: auth.signUp })
  }

  const handleSubmit = async (values) => {
    try {
      loader.current.show()
      await Promisify(onSignIn, values.username, values.password)
      navigation.reset({ index: 0, routes: [{ name: navigators.main }] })
      loader.current.hide()
    } catch (e) {
      loader.current.hide()
      showSimpleError(e, 600)
    }
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const renderForm = (params) => (
    <FormInner>
      <AppIcon />
      <FormContainer>
        <Field
          name="username"
          component={TextInput}
          keyboardType="default"
          placeholder="Username"
          autoCapitalize="none"
          variant="light"
          labelIcon={<ProfileIcon />}
        />

        <Field
          name="password"
          component={TextInput}
          placeholder="Enter your password"
          autoCapitalize="none"
          secureTextEntry
          variant="light"
          labelIcon={<LockIcon />}
          isLast
        />

        <ForgotButton onPress={handleForgotPress} />
      </FormContainer>

      <SignInButton onPress={params.handleSubmit} />

      <SignUpWrapper>
        <TextNew>New to ChitChat?</TextNew>
        <SignUpButton onPress={handleSignUpPress} />
      </SignUpWrapper>
    </FormInner>
  )

  return (
    <Container>
      <Scrollable>
        <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={handleSubmit} />
        <CloseButton onPress={handleClose} />
        <Loader ref={loader} />
      </Scrollable>
    </Container>
  )
}

SignIn.propTypes = {
  ...ReactNavigationPropTypes,
  onSignIn: PT.func.isRequired,
}

export default SignIn
