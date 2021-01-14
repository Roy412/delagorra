import auth from './auth';
import profile from './profile';
import post from './post';
import chat from './chat';

export default (apiCall) => ({
  auth: auth(apiCall),
  profile: profile(apiCall),
  post: post(apiCall),
  chat: chat(apiCall),
});
