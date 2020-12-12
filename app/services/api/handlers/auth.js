export default (apiCall) => ({
  codeRequest: (payload) =>
    apiCall({
      endpoint: 'user/code-request',
      method: 'POST',
      query: payload,
    }),
  codeVerify: (payload) =>
    apiCall({
      endpoint: 'user/code-verify',
      method: 'POST',
      query: payload,
    }),
  signIn: (payload) =>
    apiCall({
      endpoint: 'user/sign-in',
      method: 'POST',
      query: payload,
    }),
  signInToken: () =>
    apiCall({
      endpoint: 'user/refresh-token',
      method: 'POST',
    }),
});
