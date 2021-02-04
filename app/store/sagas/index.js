import { all, fork } from 'redux-saga/effects';

import APIService from '~/services/api';

import app from './app';
import auth from './auth';
import session from './session';
import profile from './profile';
import post from './post';
import chat from './chat';
import notification from './notification';

export default function* main(store) {
  const api = APIService.create(store);

  yield all([
    fork(app),
    fork(auth, api),
    fork(session),
    fork(profile, api),
    fork(post, api),
    fork(chat, api),
    fork(notification, api),
  ]);
}
