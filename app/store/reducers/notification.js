import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';
import { NotificationTypes } from '~/store/actions/notification';

const INITIAL_STATE = Immutable({
  notifications: [],
});

const getNotificationsSuccess = (state, { payload }) => {
  let updatedNotis = payload.notifications;
  if (!payload.isRefresh) {
    updatedNotis = _.unionBy(state.notifications, payload.notifications, '_id');
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
  [NotificationTypes.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [NotificationTypes.READ_NOTIFICATION_SUCCESS]: readNotificationSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
