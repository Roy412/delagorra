export default (apiCall) => ({
  update: (payload) =>
    apiCall({
      endpoint: 'user/update',
      method: 'POST',
      query: payload,
    }),
});
