import { all, put, fork, take, select } from 'redux-saga/effects';

import { AppCreators, AppTypes } from '~/store/actions/app';
import { AuthTypes } from '~/store/actions/auth';
import { isAuthenticated } from '~/store/selectors/session';

function* restoreSession() {
  while (true) {
    yield take([AppTypes.COMPLETE_REHYDRATION, AuthTypes.SIGN_IN_SUCCESS, AuthTypes.SIGN_IN_FAILURE]);

    const authenticated = yield select(isAuthenticated);

    if (authenticated) {
      yield put(AppCreators.completeRehydration());
      yield put(AppCreators.completeRefetch());
    }
  }
}

export default function* main() {
  yield all([fork(restoreSession)]);
}
