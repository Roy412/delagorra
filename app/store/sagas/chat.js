import { all, takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import { createSelector } from 'reselect';

import { ChatTypes, ChatCreators } from '~/store/actions/chat';
import { generateRandomString } from '~/utils/utils';
import { user as userSelector } from '~/store/selectors/session';
import { getMessagesByRoomId } from '~/store/selectors/chat';

// function* sendMessage(api, { payload, resolve, reject }) {
//   const response = yield call(api.chat.send, payload);
//
//   if (response.ok && response.data.result === 'OK') {
//     resolve(response.data.data);
//   } else {
//     reject(response.data);
//   }
// }

function* sendMessage(api, { payload, resolve, reject }) {
  const user = yield select(userSelector);
  const messages = yield select(getMessagesByRoomId(payload.roomId));
  let imageMockId;
  let mockId;

  if (payload.image) {
    do {
      imageMockId = generateRandomString();
    } while (_.findIndex(messages, { imageMockId }) > -1);
    yield put(
      ChatCreators.sendMessageMockRequest({
        ...payload,
        mockId: imageMockId,
        sender: user,
        type: 'image',
        mockUrl: payload.imageUrl,
      }),
    );
  }
  if (payload.text) {
    do {
      mockId = generateRandomString();
    } while (mockId !== imageMockId && _.findIndex(messages, { mockId }) > -1);
    yield put(ChatCreators.sendMessageMockRequest({ ...payload, mockId, sender: user, type: 'text' }));
  }

  let imageSent = true;
  if (payload.image) {
    // const uploadImageRes = yield call(api.chat.send, {
    //   roomId: payload.roomId,
    //   type: 'image',
    //   url,
    //   mockId: imageMockId,
    // });
    // const { data } = uploadImageRes.data;
    // if (uploadImageRes.ok && uploadImageRes.data.result === 'ok') {
    //   yield put(ChatCreators.getMessageSuccess(data.room, data.message, true, imageMockId));
    //   yield put(ChatCreators.readMessageSuccess(data.roomId, data.message._id));
    //   if (resolve) {
    //     resolve(data);
    //   }
    // } else if (reject) {
    //   reject(uploadImageRes.data);
    //   imageSent = false;
    // }
  }

  if (imageSent && payload.text) {
    const response = yield call(api.chat.send, { roomId: payload.roomId, text: payload.text, mockId });

    if (response.ok && response.data.result === 'OK') {
      const { data } = response.data;
      yield put(ChatCreators.getMessageSuccess(data.room, data.message, true, mockId));
      yield put(ChatCreators.readMessageSuccess(data.roomId, data.message._id));
      if (resolve) {
        resolve(data);
      }
    } else if (reject) {
      reject(response.data);
    }
  }
}

function* getRoom(api, { payload, resolve, reject }) {
  const response = yield call(api.chat.getRoom, payload);
  if (response.ok && response.data.result === 'OK') {
    yield put(ChatCreators.getRoomSuccess(response.data.data.room));
    yield put(ChatCreators.getMessagesSuccess(response.data.data.room._id, response.data.data.messages));
    resolve(response.data.data.room);
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([
    takeEvery(ChatTypes.CHAT_SEND_REQUEST, sendMessage, api),
    takeLatest(ChatTypes.GET_ROOM_REQUEST, getRoom, api),
  ]);
}
