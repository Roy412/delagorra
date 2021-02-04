import auth from './auth';
import profile from './profile';
import post from './post';
import chat from './chat';
import notification from './notification';

export default (apiCall) => ({
  auth: auth(apiCall),
  profile: profile(apiCall),
  post: post(apiCall),
  chat: chat(apiCall),
  notification: notification(apiCall),
});
