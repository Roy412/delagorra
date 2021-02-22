import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { compareAsc, parseISO } from 'date-fns';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { ChatTypes } from '~/store/actions/chat';
import { profileImage } from '~/resources';

const INITIAL_STATE = Immutable({
  rooms: [],
  messagesByRoomId: {},
  activeRoomId: null,
  totalCountUnread: 0,
});

const getRoomsSuccess = (state, { payload: { rooms, totalCountUnread } }) => state.merge({ rooms, totalCountUnread });

const readMessageSuccess = (state, { roomId, readAt }) => {
  const otherRooms = _.filter(state.rooms, (item) => item._id !== roomId);
  const room = _.find(state.rooms, { _id: roomId });
  if (!room) {
    return state;
  }
  const totalCountUnread = state.totalCountUnread;
  let lastReadAt = room.lastReadAt;
  if (!lastReadAt || compareAsc(parseISO(readAt), parseISO(lastReadAt)) > 0) {
    lastReadAt = readAt;
  }
  const rooms = [
    ...otherRooms,
    {
      ...room,
      lastReadAt,
      countUnread: 0,
    },
  ];

  return state.merge({ rooms, totalCountUnread: totalCountUnread - room.countUnread });
};

const getMessagesSuccess = (state, { roomId, messages }) => {
  const roomMessages = state.messagesByRoomId[roomId] || [];

  const mockMessages = _.filter(roomMessages, (msg) => !!msg.mockId);
  const sortedMessages = _.sortBy([...mockMessages, ...messages], ({ _id }) => -_id);
  const updatedMessages = _.map(sortedMessages, (msg) => ({
    ...msg,
    user: { ...msg.user, avatar: msg.user.avatar || profileImage },
  }));

  return state.merge({
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [roomId]: updatedMessages,
    },
  });
};

const getRoomSuccess = (state, { room }) => {
  const roomMessages = state.messagesByRoomId[room._id] || [];
  let cleanedMessages = _.filter(roomMessages, ({ mockId }) => !mockId);
  cleanedMessages = _.map(cleanedMessages, ({ mockUrl, ...msg }) => msg);

  return state.merge({
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [room._id]: cleanedMessages,
    },
  });
};

const getMessageSuccess = (state, { room, message, read, mockId }) => {
  message.user = { ...message.sender, avatar: message.sender.avatar || profileImage };
  const roomMessages = state.messagesByRoomId[room._id] || [];
  let totalCountUnread = state.totalCountUnread;

  if (_.find(roomMessages, { _id: message._id })) {
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
  updatedRoomMessages = _.sortBy(updatedRoomMessages, ({ _id }) => -_id);
  const lastMessage = updatedRoomMessages[0];

  const otherRooms = _.filter(state.rooms, (item) => item._id !== room._id);
  const oldRoom = _.find(state.rooms, { _id: room._id }) || {
    ...room,
    countUnread: 0,
  };

  const updatedRoom = { ...oldRoom, lastMessage };

  if (read) {
    updatedRoom.lastReadAt = lastMessage.createdAt;
    updatedRoom.countUnread = 0;
    totalCountUnread -= oldRoom.countUnread;
  } else if (!updatedRoom.lastReadAt || compareAsc(parseISO(message.createdAt), parseISO(updatedRoom.lastReadAt)) > 0) {
    updatedRoom.countUnread += 1;
    totalCountUnread += 1;
  }
  const rooms = [...otherRooms, updatedRoom];

  return state.merge({
    rooms,
    messagesByRoomId: {
      ...state.messagesByRoomId,
      [room._id]: updatedRoomMessages,
    },
    totalCountUnread,
  });
};

const sendMessageMockRequest = (state, { payload }) => {
  const roomMessages = state.messagesByRoomId[payload.roomId] || [];

  const message = {
    mockId: payload.mockId,
    roomId: payload.roomId,
    type: payload.type,
    sender: payload.sender.displayName,
    senderId: payload.sender._id,
    createdAt: new Date(),
    user: { ...payload.sender, avatar: payload.sender.avatar || profileImage },
    _id: roomMessages[0] ? parseInt(roomMessages[0]._id, 10) + 1000 : 1000,
    totalLikes: 0,
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

const messageLikeSuccess = (state, { payload: { roomId, msgId, like, totalLikes } }) => {
  const roomMessages = state.messagesByRoomId[roomId] || [];

  const updatedRoomMessages = _.map(roomMessages, (message) => {
    const result = { ...message };
    if (message._id === msgId) {
      result.like = like;
      if (totalLikes !== undefined) {
        result.totalLikes = totalLikes;
      }
    }
    return result;
  });

  return state.merge({ messagesByRoomId: { ...state.messagesByRoomId, [roomId]: updatedRoomMessages } });
};

const updateMessageSuccess = (state, { roomId, id, value }) => {
  const roomMessages = state.messagesByRoomId[roomId] || [];
  const updatedRoomMessages = _.map(roomMessages, (message) => {
    let result = { ...message };
    if (message._id === id) {
      result = { ...result, ...value };
    }
    return result;
  });

  return state.merge({ messagesByRoomId: { ...state.messagesByRoomId, [roomId]: updatedRoomMessages } });
};

const HANDLERS = {
  [ChatTypes.READ_MESSAGE_SUCCESS]: readMessageSuccess,
  [ChatTypes.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [ChatTypes.GET_MESSAGE_SUCCESS]: getMessageSuccess,
  [ChatTypes.SEND_MESSAGE_MOCK_REQUEST]: sendMessageMockRequest,
  [ChatTypes.GET_ROOM_SUCCESS]: getRoomSuccess,
  [ChatTypes.SET_ACTIVE_ROOM_ID_SUCCESS]: setActiveRoomIdSuccess,
  [ChatTypes.MESSAGE_LIKE_SUCCESS]: messageLikeSuccess,
  [ChatTypes.GET_ROOMS_SUCCESS]: getRoomsSuccess,
  [ChatTypes.UPDATE_MESSAGE_SUCCESS]: updateMessageSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
