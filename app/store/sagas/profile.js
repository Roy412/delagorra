import { all, takeLatest, call, put } from 'redux-saga/effects';

import { ProfileTypes, ProfileCreators } from '~/store/actions/profile';

function* updateProfile(api, { payload, resolve, reject }) {
  const response = yield call(api.profile.update, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(ProfileCreators.profileUpdateSuccess(response.data.data));
    resolve();
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([takeLatest(ProfileTypes.PROFILE_UPDATE_REQUEST, updateProfile, api)]);
}
