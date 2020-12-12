import { createActions } from 'reduxsauce';

export const { Types: AuthTypes, Creators: AuthCreators } = createActions(
  {
    requestCodeRequest: ['payload', 'resolve', 'reject'],
    codeVerifyRequest: ['payload', 'resolve', 'reject'],

    signInRequest: ['payload', 'resolve', 'reject'],
    signInSuccess: ['payload'],
    signInFailure: null,
    signInTokenRequest: ['payload', 'resolve', 'reject'],

    logOutRequest: null,
    logOutSuccess: null,
  },
  { prefix: 'Auth/' },
);
