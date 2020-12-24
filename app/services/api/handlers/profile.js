export default (apiCall) => ({
  update: (payload) =>
    apiCall({
      endpoint: 'profile/update',
      method: 'POST',
      query: payload,
    }),
});
