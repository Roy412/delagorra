import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';

import { AuthTypes } from '~/store/actions/auth';
import { ChatTypes } from '~/store/actions/chat';
import { profileImage } from '~/resources';

const INITIAL_STATE = Immutable({
  rooms: [],
  messagesByRoomId: {},
  activeRoomId: null,
});

const getRoomsSuccess = (state, { rooms }) => state.merge({ rooms });

const readMessageSuccess = (state, { roomId, messageId }) => {
  const otherRooms = _.filter(state.rooms, (item) => item.id !== roomId);
  const room = _.find(state.rooms, { id: roomId });
  if (!room) {
    return state;
  }
  const rooms = [
    ...otherRooms,
    {
      ...room,
      lastReadMessageId: room.lastReadMessageId < messageId ? messageId : room.lastReadMessageId,
      countUnread: 0,
    },
  ];

  return state.merge({ rooms });
};

const getMessagesSuccess = (state, { roomId, messages }) => {
  const roomMessages = state.messagesByRoomId[roomId] || [];

  const mockMessages = _.filter(roomMessages, (msg) => !!msg.mockId);
  const sortedMessages = _.sortBy([...mockMessages, ...messages], ({ _id }) => -_id);

  return state.merge({
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [roomId]: sortedMessages,
    },
  });
};

const getRoomRequest = (state, { roomId }) => {
  const roomMessages = state.messagesByRoomId[roomId] || [];
  let cleanedMessages = _.filter(roomMessages, ({ mockId }) => !mockId);
  cleanedMessages = _.map(cleanedMessages, ({ mockUrl, ...msg }) => msg);

  return state.merge({
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [roomId]: cleanedMessages,
    },
  });
};

const getMessageSuccess = (state, { room, message, read, mockId }) => {
  const roomMessages = state.messagesByRoomId[room.id] || [];

  if (_.find(roomMessages, { id: message.id })) {
    return state;
  }

  let updatedRoomMessages;
  if (mockId) {
    const mockMessage = _.find(roomMessages, { mockId });
    if (mockMessage) {
      updatedRoomMessages = _.map(roomMessages, (msg) => {
        if (msg.mockId === mockId) {
          return { ...message, mockUrl: msg.mockUrl };
        }
        return msg;
      });
    } else {
      updatedRoomMessages = [message, ...roomMessages];
    }
  } else {
    updatedRoomMessages = [message, ...roomMessages];
  }
  updatedRoomMessages = _.sortBy(updatedRoomMessages, ({ id }) => -id);
  const lastMessage = updatedRoomMessages[0];

  const otherRooms = _.filter(state.rooms, (item) => item.id !== room.id);
  const oldRoom = _.find(state.rooms, { id: room.id }) || {
    ...room,
    countUnread: 0,
    lastReadMessageId: 0,
  };

  const updatedRoom = { ...oldRoom, lastMessage };
  if (read) {
    updatedRoom.lastReadMessageId = lastMessage.id;
  } else if (updatedRoom.lastReadMessageId < lastMessage.id) {
    updatedRoom.countUnread += 1;
  }
  const rooms = [...otherRooms, updatedRoom];

  return state.merge({
    rooms,
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [room.id]: updatedRoomMessages,
    },
  });
};

const sendMessageMockRequest = (state, { payload }) => {
  const roomMessages = state.messagesByRoomId[payload.roomId] || [];

  const message = {
    mockId: payload.mockId,
    roomId: payload.roomId,
    type: payload.type,
    sender: payload.sender.displayName,
    senderId: payload.sender.id,
    createdAt: new Date(),
    user: { ...payload.sender, avatar: payload.sender.avatar || profileImage },
    _id: roomMessages[0] ? parseInt(roomMessages[0]._id, 10) + 1000 : 1000,
  };

  if (payload.type === 'image') {
    message.mockUrl = payload.mockUrl;
  } else {
    message.text = payload.text;
  }

  return state.merge({
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [payload.roomId]: [message, ...roomMessages],
    },
  });
};

const setActiveRoomIdSuccess = (state, { roomId }) => state.merge({ activeRoomId: roomId });

const HANDLERS = {
  [ChatTypes.GET_ROOMS_SUCCESS]: getRoomsSuccess,
  [ChatTypes.READ_MESSAGE_SUCCESS]: readMessageSuccess,
  [ChatTypes.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [ChatTypes.GET_MESSAGE_SUCCESS]: getMessageSuccess,
  [ChatTypes.SEND_MESSAGE_MOCK_REQUEST]: sendMessageMockRequest,
  // [ChatTypes.GET_ROOM_REQUEST]: getRoomRequest,
  [ChatTypes.SET_ACTIVE_ROOM_ID_SUCCESS]: setActiveRoomIdSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});