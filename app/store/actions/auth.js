import { createActions } from 'reduxsauce';

export const { Types: AuthTypes, Creators: AuthCreators } = createActions(
  {
    requestCodeRequest: ['payload', 'resolve', 'reject'],
    codeVerifyRequest: ['payload', 'resolve', 'reject'],
    signInSuccess: ['payload'],
    signInFailure: null,

    logOutRequest: null,
    logOutSuccess: null,
  },
  { prefix: 'Auth/' },
);
