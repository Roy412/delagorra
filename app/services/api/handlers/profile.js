export default (apiCall) => ({
  update: ({ profileImage, ...payload }) =>
    apiCall({
      endpoint: 'profile/update',
      method: 'POST',
      query: payload,
      file: profileImage,
    }),
  getProfile: (profileId) =>
    apiCall({
      endpoint: `profile/get/${profileId}`,
      method: 'GET',
    }),
});
