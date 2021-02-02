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
  messageLike: ({ roomId, msgId, ...payload }) =>
    apiCall({
      endpoint: `chat/${roomId}/${msgId}/like`,
      method: 'POST',
      query: payload,
    }),
  getMessages: (payload) =>
    apiCall({
      endpoint: 'chat/list',
      method: 'POST',
      query: payload,
    }),
  getRooms: (payload) =>
    apiCall({
      endpoint: 'chat/get-rooms',
      method: 'POST',
      query: payload,
    }),
});
