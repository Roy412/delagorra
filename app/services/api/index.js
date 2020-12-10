import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import superagent from 'superagent';
import qs from 'qs';
import _ from 'lodash';
import Config from 'react-native-config';

import { getJWTHeader } from '~/store/selectors/session';

import createHandlers from './handlers';

const DEFAULT_OPTIONS = {
  base: {
    url: Config.API_HOST,
    endpoint: '',
    needsNormalization: true,
  },
  json: {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    query: {},
  },
  upload: {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    query: {},
    body: {},
  },
};

const sendMethod = (HTTPMethod) =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch' ? 'send' : 'query';

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' || HTTPMethod === 'put' || HTTPMethod === 'patch'
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' });

const buildSuccessResponse = (body, dirtyOptions) => {
  const options = merge({}, DEFAULT_OPTIONS.base, dirtyOptions);

  return {
    data: body,
    options,
    ok: true,
  };
};

const buildFailureResponse = (status, error, options = {}) => ({
  data: error.response ? error.response.body : { message: error.message },
  options,
  ok: false,
});

const getRequester = (options) => {
  const HTTPMethod = options.method.toLowerCase();
  const url = options.url + options.endpoint;

  const request = superagent[HTTPMethod](url);

  if (options.file) {
    const { fieldName, ...file } = options.file;

    request.attach(fieldName, file);
    request.query(options.query);

    if (!isEmpty(options.body)) {
      request.field(options.body);
    }
  } else if (options.files) {
    _.forEach(options.files, (fileData) => {
      if (fileData) {
        const { fieldName, ...file } = fileData;
        request.attach(fieldName, file);
      }
    });
    if (!isEmpty(options.body)) {
      request.field(options.body);
    }
    request.query(options.query);
  } else {
    request[sendMethod(HTTPMethod)](sendArguments(HTTPMethod, options.query));
  }

  request.set(options.headers);

  return request;
};

const create = (store) => {
  const request = (dirtyOptions, resolve) => {
    let options;
    if (dirtyOptions.file) {
      options = merge({}, DEFAULT_OPTIONS.upload, dirtyOptions);
    } else {
      options = merge({}, DEFAULT_OPTIONS.json, dirtyOptions);
    }

    getRequester(options).end((error, data) => {
      if (isEmpty(data) || data.body === null) {
        merge(data, { body: {} });
      }

      if (error) {
        const status = get(data, 'error.status');
        const result = buildFailureResponse(status, error, options);
        resolve(result);
      } else {
        const result = buildSuccessResponse(data.body, options);
        resolve(result);
      }
    });
  };

  const apiCall = (options) =>
    new Promise((resolve) => {
      const opts = merge({}, DEFAULT_OPTIONS.base, options);
      const JWTHeader = getJWTHeader(store.getState());
      // console.log('METHOD:', opts.method)
      // console.log('URL:', `${opts.url}${opts.endpoint}`)
      // console.log('JWT Header:', JWTHeader)
      // console.log('PARAMS:', opts.query)

      const baseOptions = merge(
        {},
        opts,
        opts.url === DEFAULT_OPTIONS.base.url &&
          JWTHeader && {
            headers: {
              Authorization: JWTHeader,
            },
          },
      );

      request(baseOptions, resolve);
    });

  return createHandlers(apiCall);
};

export default {
  create,
  buildSuccessResponse,
  buildFailureResponse,
};
