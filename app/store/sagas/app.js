import { all, put, takeLatest, select } from 'redux-saga/effects';

import { AppCreators, AppTypes } from '~/store/actions/app';
import { AuthCreators } from '~/store/actions/auth';
import { isAuthenticated } from '~/store/selectors/session';

function* startup() {
  const authenticated = yield select(isAuthenticated);
  if (authenticated) {
    yield put(AuthCreators.signInTokenRequest());
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
