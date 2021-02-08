import { createSelector } from 'reselect';
import _ from 'lodash';

const getState = (state) => state.notification;

export const notifications = createSelector(getState, (state) => _.get(state, 'notifications'));

export const totalCountUnread = createSelector(getState, (state) => _.get(state, 'totalCountUnread'));
