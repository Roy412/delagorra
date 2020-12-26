import { all, put, fork, take } from 'redux-saga/effects';

import { AppCreators } from '~/store/actions/app';
import { AuthTypes } from '~/store/actions/auth';

function* restoreSession() {
  while (true) {
    yield take([AuthTypes.SIGN_IN_SUCCESS, AuthTypes.SIGN_IN_FAILURE]);

    yield put(AppCreators.completeRehydration());
  }
}

export default function* main() {
  yield all([fork(restoreSession)]);
}
