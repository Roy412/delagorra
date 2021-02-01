import { all, takeLatest, call, put } from 'redux-saga/effects';

import { PostTypes, PostCreators } from '~/store/actions/post';

function* createPost(api, { payload, resolve, reject }) {
  const response = yield call(api.post.create, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(PostCreators.createPostSuccess(response.data.data));
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

function* getPosts(api, { payload, resolve, reject }) {
  const response = yield call(api.post.getPosts, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(PostCreators.getPostsSuccess({ ...response.data.data, isRefresh: !payload.lastId }));
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

function* postUpdateStatus(api, { payload, resolve, reject }) {
  const response = yield call(api.post.postUpdateStatus, payload);

  if (response.ok && response.data.result === 'OK') {
    yield put(PostCreators.postUpdateStatusSuccess(payload));
    resolve(response.data.data);
  } else {
    reject(response.data);
  }
}

export default function* main(api) {
  yield all([
    takeLatest(PostTypes.CREATE_POST_REQUEST, createPost, api),
    takeLatest(PostTypes.GET_POSTS_REQUEST, getPosts, api),
    takeLatest(PostTypes.POST_UPDATE_STATUS_REQUEST, postUpdateStatus, api),
  ]);
}
