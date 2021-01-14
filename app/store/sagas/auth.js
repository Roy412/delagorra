import { all, takeLatest, call, put } from 'redux-saga/effects';

import { AuthTypes, AuthCreators } from '~/store/actions/auth';

function* codeRequest(api, { payload, resolve, reject }) {
  const response = yield call(api.auth.codeRequest, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

function* signIn(api, { payload, resolve, reject }) {
  const response = yield call(api.auth.signIn, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

function* codeVerify(api, { payload, resolve, reject }) {
  const response = yield call(api.auth.codeVerify, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

function* signInToken(api) {
  const response = yield call(api.auth.signInToken);
  if (response.ok && response.data.result === 'OK') {
    yield put(AuthCreators.signInSuccess(response.data.data));
  } else {
    yield put(AuthCreators.signInFailure());
    yield put(AuthCreators.logOutSuccess());
  }
}

function* logOut() {
  yield put(AuthCreators.logOutSuccess());
}

function* updatePassword(api, { payload, resolve, reject }) {
  const response = yield call(api.auth.updatePassword, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve();
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([
    takeLatest(AuthTypes.REQUEST_CODE_REQUEST, codeRequest, api),
    takeLatest(AuthTypes.CODE_VERIFY_REQUEST, codeVerify, api),
    takeLatest(AuthTypes.SIGN_IN_TOKEN_REQUEST, signInToken, api),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn, api),
    takeLatest(AuthTypes.LOG_OUT_REQUEST, logOut),
    takeLatest(AuthTypes.UPDATE_PASSWORD_REQUEST, updatePassword, api),
  ]);
}
