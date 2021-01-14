import auth from './auth';
import profile from './profile';
import post from './post';

export default (apiCall) => ({
  auth: auth(apiCall),
  profile: profile(apiCall),
  post: post(apiCall),
  chat: post(apiCall),
});
