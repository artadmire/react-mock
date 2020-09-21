
/**
 * 从给定字符串中解析url参数，默认解析window.location.search
 */
// eslint-disable-next-line import/prefer-default-export
export const parseQueryString = (search = window.location && window.location.search) => {
  if (typeof (search) !== typeof ('')) throw new Error('param must be a string');
  if (search.length < 3) return {};
  const query = search.substring(search.indexOf('?') + 1);
  const reg = /([^=&#]+)=([^&#]*)/ig;
  let match = null;
  const result = {};
  for (match = reg.exec(query); match; match = reg.exec(query)) {
    // result[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    // eslint-disable-next-line prefer-destructuring
    result[match[1]] = match[2];
  }
  return result;
};

/**
 *
 * @param {*} pathname
 * /rules/id 截取出rules
 */

export const getPathKey = (pathname = '') => {
  if (typeof pathname !== 'string') return '';
  const reg = /\/([^/]*)\/?/;
  const matchList = pathname.match(reg);
  if (matchList) return matchList[1];
  return '';
};
