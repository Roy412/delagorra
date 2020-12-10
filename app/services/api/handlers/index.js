import auth from './auth';

export default (apiCall) => ({
  auth: auth(apiCall),
});
