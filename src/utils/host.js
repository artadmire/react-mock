// eslint-disable-next-line import/no-mutable-exports
let host = '';
/**
 * 生成请求url
 * @param {*} path
 */
const Rpath = path => `${host}/${path}`;

/**
 * 设置默认host
 * @param {*} h
 */
const setHost = (h) => {
  host = h;
};

export {
  setHost,
  Rpath,
};
