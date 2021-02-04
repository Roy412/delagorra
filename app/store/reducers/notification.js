import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { PostTypes } from '~/store/actions/post';

const INITIAL_STATE = Immutable({
  notifications: [],
});

const getNotificationsSuccess = (state, { payload }) => {
  let updatedNotis = payload.posts;
  if (!payload.isRefresh) {
    updatedNotis = _.unionBy(state.notifications, payload.posts, '_id');
  }
  return state.merge({ notifications: updatedNotis });
};

const readNotificationSuccess = (state, { payload }) => {
  const updatedNotis = _.map(state.notifications, (noti) => {
    if (noti._id === payload.notificationId) {
      return { ...noti, isRead: true };
    }
    return noti;
  });

  return state.merge({ notifications: updatedNotis });
};

const HANDLERS = {
  [PostTypes.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [PostTypes.READ_NOTIFICATION_SUCCESS]: readNotificationSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
