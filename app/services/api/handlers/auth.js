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
});
