export default (apiCall) => ({
  create: ({ postImage, ...payload }) =>
    apiCall({
      endpoint: 'post/create',
      method: 'POST',
      query: payload,
      file: postImage,
    }),
});
