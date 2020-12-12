import auth from './auth';
import profile from './profile';

export default (apiCall) => ({
  auth: auth(apiCall),
  profile: profile(apiCall),
});
