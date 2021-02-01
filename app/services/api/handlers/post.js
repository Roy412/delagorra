export default (apiCall) => ({
  create: ({ postImage, ...payload }) =>
    apiCall({
      endpoint: 'post/create',
      method: 'POST',
      query: payload,
      file: postImage,
    }),
  getPosts: (payload) =>
    apiCall({
      endpoint: 'post/list',
      method: 'POST',
      query: payload,
    }),
  postUpdateStatus: (payload) =>
    apiCall({
      endpoint: 'post/update-status',
      method: 'POST',
      query: payload,
    }),
});
