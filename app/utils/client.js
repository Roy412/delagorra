import axios from 'axios';
import qs from 'qs';
import Config from 'react-native-config';

const Client = axios.create({
  baseURL: Config.API_HOST,
});

export const get = async (url, data) => {
  try {
    const res = await Client.get(`${url}?${qs.stringify(data)}`);
    return res.data;
  } catch (e) {
    return e;
  }
};

export const post = async (url, data, config = {}) => handleResponse(Client.post(url, data, config));

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

const handleResponse = async (func) => {
  try {
    const res = await func;
    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
