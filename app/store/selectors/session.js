import { createSelector } from 'reselect';
import get from 'lodash/get';

const getState = (state) => state.session;

export const user = createSelector(getState, (state) => get(state, 'user'));

export const userType = createSelector(getState, (state) => get(state, 'user.type'));

export const getFcmToken = createSelector(getState, (state) => state.fcmToken);

export const getJWTToken = createSelector(getState, (state) => state.token);

export const getJWTHeader = createSelector(getJWTToken, (token) => (token ? `Bearer ${token}` : null));

export const isAuthenticated = createSelector(getJWTToken, (token) => token !== null);

export const searchHistory = createSelector(getState, (state) => state.searchHistory);
