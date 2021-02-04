import { createActions } from 'reduxsauce';

export const { Types: NotificationTypes, Creators: NotificationCreators } = createActions(
  {
    getNotificationsRequest: ['payload', 'resolve', 'reject'],
    getNotificationsSuccess: ['payload'],

    readNotificationRequest: ['payload', 'resolve', 'reject'],
    readNotificationSuccess: ['payload'],
  },
  { prefix: 'Notification/' },
);
