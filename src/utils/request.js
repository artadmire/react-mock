import axios from 'axios';
import { Rpath } from './host';

axios.defaults.timeout = 30 * 1000;

// 添加请求拦截器
axios.interceptors.request.use(config => config,
  error => Promise.reject(error));

// 添加响应拦截器
axios.interceptors.response.use(response => response,
  error => Promise.reject(error));

const reqMethod = ['get', 'post'];

class Axios {
  static checkStatusCode({ error, path }) {
    console.info(path, error);
    return Promise.reject(error);
  }
}
reqMethod.forEach((method) => {
  Axios.prototype[method] = (path, data) => axios[method](Rpath(path), data).then(
    (res) => {
      console.log(path, res.data);
      return res.data;
    }, error => Axios.checkStatusCode({ error, path }),
  );
});

export default new Axios();
