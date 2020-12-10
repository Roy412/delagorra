export default (apiCall) => ({
  codeRequest: (payload) =>
    apiCall({
      endpoint: 'user/code-request',
      method: 'POST',
      query: payload,
    }),
});
