export default (apiCall) => ({
  send: (payload) =>
    apiCall({
      endpoint: 'chat/send',
      method: 'POST',
      query: payload,
    }),
  getRoom: (payload) =>
    apiCall({
      endpoint: 'chat/get-room',
      method: 'POST',
      query: payload,
    }),
  readMessage: ({ roomId, messageId }) =>
    apiCall({
      endpoint: `chat/${roomId}/read`,
      method: 'POST',
      query: {
        messageId,
      },
    }),
});
