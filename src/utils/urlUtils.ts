/**
 * Add the object as a parameter to splicing it to the URL
 *  * @param baseUrl the url to be concatenated
 *  * @param obj parameter object
 *  * @returns {string} the concatenated object
 *  * example:
 *  * let obj = {a: '3', b: '4'}
 *  * setObjToUrlParams('www.baidu.com', obj)
 *  * ==>www.baidu.com?a=3&b=4
 *  */
export function setObjToUrlParams(baseUrl: string, obj: object): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}
