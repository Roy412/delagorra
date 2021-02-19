export default (apiCall) => ({
  update: ({ files, ...payload }) =>
    apiCall({
      endpoint: 'profile/update',
      method: 'POST',
      query: payload,
      files,
    }),
  getProfile: (profileId) =>
    apiCall({
      endpoint: `profile/get/${profileId}`,
      method: 'GET',
    }),
  follow: ({ otherId, ...payload }) =>
    apiCall({
      endpoint: `profile/${otherId}/follow`,
      method: 'POST',
      query: payload,
    }),
});
