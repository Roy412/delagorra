import { createActions } from 'reduxsauce';

export const { Types: ChatTypes, Creators: ChatCreators } = createActions(
  {
    chatSendRequest: ['payload', 'resolve', 'reject'],
    sendMessageMockRequest: ['payload'],

    getMessageSuccess: ['room', 'message', 'read', 'mockId'],
    getMessagesSuccess: ['roomId', 'messages'],

    setActiveRoomIdSuccess: ['roomId'],

    getRoomRequest: ['payload', 'resolve', 'reject'],
    getRoomSuccess: ['room'],

    readMessageRequest: ['payload', 'resolve', 'reject'],
    readMessageSuccess: ['roomId', 'messageId'],

    messageLikeRequest: ['payload', 'resolve', 'reject'],
    messageLikeSuccess: ['payload'],

    getMessagesRequest: ['payload', 'resolve', 'reject'],

    getRoomsRequest: ['payload', 'resolve', 'reject'],
    getRoomsSuccess: ['payload'],

    messageReadRequest: ['payload', 'resolve', 'reject'],

    updateMessageSuccess: ['roomId', 'id', 'value'],
  },
  { prefix: 'Chat/' },
);
