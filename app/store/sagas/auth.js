import { all, takeLatest, call } from 'redux-saga/effects';

import { AuthTypes } from '~/store/actions/auth';

function* codeRequest(api, { payload, resolve, reject }) {
  const response = yield call(api.auth.codeRequest, payload);

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

export default function* main(api) {
  yield all([
    takeLatest(AuthTypes.REQUEST_CODE_REQUEST, codeRequest, api),
    takeLatest(AuthTypes.CODE_VERIFY_REQUEST, codeVerify, api),
  ]);
}
