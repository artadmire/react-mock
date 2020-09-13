import axios from './request';
import store, { ActionMap } from '../store/index';

const get = async (path) => {
  try {
    const res = await axios.get(path);
    if (!res || !res.success || !res.data) throw new Error('请求错误');
    store.dispatch(ActionMap[path](res.data));
  } catch (error) {
    console.info(error);
  }
};


const post = async (path, data) => {
  try {
    const res = await axios.post(path, data);
    if (!res || !res.success || !res.data) throw new Error('请求错误');
  } catch (error) {
    console.info(error);
  }
};

export const reqSceneData = () => {
  get('scenes');
};

export const postSceneData = (data) => {
  post('scenes', data);
};

export const reqApiData = () => {
  get('apis');
};

export const postApiData = (data) => {
  post('apis', data);
};

export const reqRuleData = () => {
  get('rules');
};

export const postRuleData = (data) => {
  post('rules', data);
};
