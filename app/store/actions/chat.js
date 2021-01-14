import { createActions } from 'reduxsauce';

export const { Types: ChatTypes, Creators: ChatCreators } = createActions(
  {
    chatSendRequest: ['payload', 'resolve', 'reject'],
    sendMessageMockRequest: ['payload', 'resolve', 'reject'],

    getMessageSuccess: ['room', 'message', 'read', 'mockId'],

    setActiveRoomIdSuccess: ['roomId'],
  },
  { prefix: 'Chat/' },
);
