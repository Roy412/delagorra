export default (apiCall) => ({
  getNotifications: (payload) =>
    apiCall({
      endpoint: 'notification/list',
      method: 'POST',
      query: payload,
    }),
  markRead: (notificationId) =>
    apiCall({
      endpoint: `notification/${notificationId}/read`,
      method: 'POST',
    }),
});
