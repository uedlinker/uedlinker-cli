/**
 * 转换url地址为数组形式
 * '/aaa/bbb/ccc' => ['/aaa', '/aaa/bbb', '/aaa/bbb/ccc']
 *
 * @param {URL} url
 * @returns {Array} 转换后的url数组
 */
export function convertUrlToArray (url) {
  const urlArray = url.split('/')
  return urlArray.map((item, index, array) => array.slice(0, index + 1).join('/')).slice(1)
}

export default {
  convertUrlToArray,
}
