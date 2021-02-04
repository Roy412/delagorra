import { all, takeLatest, call, put } from 'redux-saga/effects';

import { NotificationTypes, NotificationCreators } from '~/store/actions/notification';

function* getNotifications(api, { payload, resolve, reject }) {
  const response = yield call(api.notification.getNotifications, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(NotificationCreators.getNotificationsSuccess({ ...response.data.data, isRefresh: !payload.lastId }));
    if (resolve) {
      resolve(response.data.data);
    }
  } else if (reject) {
    reject(response.data);
  }
}

function* readNotification(api, { payload, resolve, reject }) {
  const response = yield call(api.notification.markRead, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(NotificationCreators.readNotificationSuccess(payload));
    resolve(response.data.data);
  } else if (reject) {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([
    takeLatest(NotificationTypes.GET_NOTIFICATIONS_REQUEST, getNotifications, api),
    takeLatest(NotificationTypes.READ_NOTIFICATION_REQUEST, readNotification, api),
  ]);
}
