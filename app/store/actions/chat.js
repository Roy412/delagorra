import { createActions } from 'reduxsauce';

export const { Types: ChatTypes, Creators: ChatCreators } = createActions(
  {
    chatSendRequest: ['payload', 'resolve', 'reject'],
    sendMessageMockRequest: ['payload'],

    getMessageSuccess: ['room', 'message', 'read', 'mockId'],
    getMessagesSuccess: ['roomId', 'messages'],

    setActiveRoomIdSuccess: ['roomId'],

    getRoomRequest: ['payload', 'resolve', 'reject'],
  },
  { prefix: 'Chat/' },
);
