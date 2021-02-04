import { all, put, takeLatest, select } from 'redux-saga/effects';

import { AppCreators, AppTypes } from '~/store/actions/app';
import { AuthCreators } from '~/store/actions/auth';
import { ChatCreators } from '~/store/actions/chat';
import { NotificationCreators } from '~/store/actions/notification';
import { isAuthenticated } from '~/store/selectors/session';

function* startup() {
  const authenticated = yield select(isAuthenticated);
  if (authenticated) {
    yield put(AuthCreators.signInTokenRequest());
    yield put(ChatCreators.getRoomsRequest());
    yield put(NotificationCreators.getNotificationsRequest({}));
  } else {
    yield put(AppCreators.completeRehydration());
  }
}

function* refresh() {
  // const authenticated = yield select(isAuthenticated);
}

export default function* main() {
  yield all([takeLatest(AppTypes.STARTUP, startup), takeLatest(AppTypes.REFRESH, refresh)]);
}
