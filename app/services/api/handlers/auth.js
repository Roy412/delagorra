export default (apiCall) => ({
  codeRequest: (payload) =>
    apiCall({
      endpoint: 'auth/code-request',
      method: 'POST',
      query: payload,
    }),
  codeVerify: (payload) =>
    apiCall({
      endpoint: 'auth/code-verify',
      method: 'POST',
      query: payload,
    }),
  signIn: (payload) =>
    apiCall({
      endpoint: 'auth/sign-in',
      method: 'POST',
      query: payload,
    }),
  signInToken: () =>
    apiCall({
      endpoint: 'auth/refresh-token',
      method: 'POST',
    }),
  updatePassword: (payload) =>
    apiCall({
      endpoint: 'auth/update-password',
      method: 'POST',
      query: payload,
    }),
});
