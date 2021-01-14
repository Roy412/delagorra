export default (apiCall) => ({
  send: (payload) =>
    apiCall({
      endpoint: 'chat/send',
      method: 'POST',
      query: payload,
    }),
});
