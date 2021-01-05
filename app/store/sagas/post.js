import { all, takeLatest, call, put } from 'redux-saga/effects';

import { PostTypes, PostCreators } from '~/store/actions/post';

function* createPost(api, { payload, resolve, reject }) {
  const response = yield call(api.post.create, payload);

  if (response.ok && response.data.result === 'OK') {
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([takeLatest(PostTypes.CREATE_POST_REQUEST, createPost, api)]);
}
