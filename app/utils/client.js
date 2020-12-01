import axios from 'axios';
import qs from 'qs';
import Config from 'react-native-config';

const Client = axios.create({
  baseURL: Config.API_HOST,
  withCredentials: true,
});
Client.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const get = async (url, data) => {
  try {
    const res = await Client.get(`${url}?${qs.stringify(data)}`);
    return res.data;
  } catch (e) {
    return e;
  }
};

export const post = async (url, data, config = {}) => {
  const res = await Client.post(url, data, config);
  return res;
};

export const put = async (url, data) => {
  const res = await Client.put(url, data);
  return res;
};

export const del = async (url, data) => {
  try {
    const res = await Client.request({
      url,
      method: 'DELETE',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
